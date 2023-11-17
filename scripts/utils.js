require('dotenv').config({ path: './.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const toDateTime = (secs) => {
  const t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

const getAllSupabaseUsers = async () => {
  const allUsers = [];
  let current = 1;
  const perPage = 50;

  while (true) {
    const {
      data: { users },
      error
    } = await supabaseAdmin.auth.admin.listUsers({
      page: current++,
      perPage: perPage
    });

    if (error) throw error;

    allUsers.push(...users);

    if (users.length < perPage) {
      break;
    }
  }

  console.log(`Fetched ${allUsers.length} users from Supabase`);

  return allUsers;
};

const getAllStripeCustomers = async () => {
  let allCustomers = [];
  let lastId = null;
  const limit = 100;

  while (true) {
    const params = {
      limit
    };
    if (lastId) {
      params.starting_after = lastId;
    }

    const customers = await stripe.customers.list(params);

    allCustomers.push(...customers.data);

    if (customers.data.length < limit) {
      break;
    }

    lastId = customers.data[customers.data.length - 1].id;
  }

  console.log(`Fetched ${allCustomers.length} customers from Stripe`);

  return allCustomers;
};

const getAllStripeSubscriptions = async () => {
  let allSubscriptions = [];
  let lastSubscriptionId = null;
  const limit = 100;

  while (true) {
    const params = {
      limit
    };

    if (lastSubscriptionId) {
      params.starting_after = lastSubscriptionId;
    }

    try {
      const subscriptions = await stripe.subscriptions.list(params);

      allSubscriptions = allSubscriptions.concat(subscriptions.data);

      if (subscriptions.has_more) {
        lastSubscriptionId =
          subscriptions.data[subscriptions.data.length - 1].id;
      } else {
        break;
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  }

  console.log(`Fetched ${allSubscriptions.length} subscriptions from Stripe`);

  return allSubscriptions;
};

const upsertSupabaseUserRecord = async (userData) => {
  const { email, full_name } = userData;
  const { error } = await supabaseAdmin.from('users').upsert([userData]);

  if (error) {
    console.error(
      `Error updating user full_name with email ${email}: ${error.message}`
    );
    throw error;
  }
};

const upsertSupabaseCustomerRecord = async (customerData) => {
  const { id, stripe_customer_id } = customerData;
  const { error } = await supabaseAdmin.from('customers').upsert(customerData);

  if (error) {
    console.error(`Error inserting into customers table: ${error.message}`);
    throw error;
  }

  console.log(`Customer updated: ${id}, ${stripe_customer_id}`);
};

const copyBillingDetailsToCustomer = async (uuid, payment_method) => {
  const customer = payment_method.customer;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;

  await stripe.customers.update(customer, { name, phone, address });
  const { error } = await supabaseAdmin
    .from('users')
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] }
    })
    .eq('id', uuid);
  if (error) throw error;
};

const manageSubscriptionStatusChange = async (
  subscriptionId,
  customerId,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  const { id: uuid } = customerData;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });

  const subscriptionData = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? toDateTime(subscription.cancel_at).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    current_period_start: toDateTime(
      subscription.current_period_start
    ).toISOString(),
    current_period_end: toDateTime(
      subscription.current_period_end
    ).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at
      ? toDateTime(subscription.ended_at).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? toDateTime(subscription.trial_end).toISOString()
      : null
  };

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert([subscriptionData]);
  if (error) throw error;
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  const { error: updateError } = await supabaseAdmin
    .from('users')
    .update({ subscription_id: subscription.id })
    .eq('id', uuid)
    .select()
    .single();
  if (updateError) throw error;
  console.log(
    `Updated subscription_id [${subscription.id}] for user [${uuid}]`
  );

  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method
    );
};

const updateSupabaseFromStripe = async ({
  users,
  customers,
  subscriptions
}) => {
  console.log(
    `--------------------------------------------------------------------------`
  );
  for (let customer of customers) {
    let supabaseUser = users.find((user) => user.email === customer.email);

    console.log(`Processing Supabase user with email ${customer.email}`);
    if (supabaseUser) {
      console.log(
        `Supabase User with the same email already exists: ${supabaseUser.email}`
      );

      const userData = {
        id: supabaseUser.id,
        email: customer.email,
        full_name: customer.name
      };

      await upsertSupabaseUserRecord(userData);

      console.log(
        `User full_name updated with email ${customer.email}: ${customer.full_name}`
      );
    } else {
      const {
        data: { user },
        error
      } = await supabaseAdmin.auth.admin.createUser({
        email: customer.email,
        password: process.env.SUPABASE_AUTH_USER_DEFAULT_PASSWORD || '12345678',
        email_confirm: true
      });

      if (error) {
        console.error(
          `Error creating user with email ${user.email}: ${error.message}`
        );
        throw error;
      }

      const userData = {
        id: user.id,
        full_name: customer.name
      };

      const { error: upsertError } = await supabaseAdmin
        .from('users')
        .upsert([userData]);

      if (upsertError) {
        console.error(
          `Error creating user full_name with email ${user.email}: ${error.message}`
        );
        throw upsertError;
      }

      console.log(`User created with email ${user.email}: ${user.id}`);
    }

    const customerData = {
      id: supabaseUser.id,
      stripe_customer_id: customer.id
    };
    await upsertSupabaseCustomerRecord(customerData);

    const subscription = subscriptions.find(
      (item) => item.customer === customer.id
    );

    if (subscription) {
      await manageSubscriptionStatusChange(
        subscription.id,
        subscription.customer,
        !supabaseUser.subscription_id
      );
    }

    console.log(`Supabase user process with email ${customer.email} completed`);
    console.log(
      `--------------------------------------------------------------------------`
    );
  }
};

const updateStripeFromSupabase = async ({ users, customers }) => {
  console.log(
    `--------------------------------------------------------------------------`
  );
  for (let user of users) {
    let stripeCustomer = customers.find(
      (customer) => customer.email === user.email
    );

    if (stripeCustomer) {
      console.log(
        `Stripe customer with the same email already exists: ${user.email}`
      );

      const updatedCustomer = await stripe.customers.update(stripeCustomer.id, {
        name: user.full_name
      });

      console.log(
        `Stripe customer name updated with email ${updatedCustomer.email}: ${updatedCustomer.name}`
      );
    } else {
      stripeCustomer = await stripe.customers.create({
        email: user.email
      });
      console.log(
        `Stripe customer created with email ${user.email}: ${stripeCustomer.id}`
      );
    }

    const customerData = {
      id: user.id,
      stripe_customer_id: stripeCustomer.id
    };
    await upsertSupabaseCustomerRecord(customerData);

    console.log(`Stripe customer process with email ${user.email} completed`);
    console.log(
      `--------------------------------------------------------------------------`
    );
  }
};

module.exports = {
  toDateTime,
  getAllSupabaseUsers,
  getAllStripeCustomers,
  getAllStripeSubscriptions,
  upsertSupabaseUserRecord,
  upsertSupabaseCustomerRecord,
  copyBillingDetailsToCustomer,
  manageSubscriptionStatusChange,
  updateSupabaseFromStripe,
  updateStripeFromSupabase,
};
