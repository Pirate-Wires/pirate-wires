require("dotenv").config({path: "./.env.local"});
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {createClient} = require("@supabase/supabase-js");
const {TrackClient, APIClient, RegionUS} = require("customerio-node");
const crypto = require("crypto");

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const CUSTOMER_IO_SEGMENT_ID = 24;
const SITE_ID = process.env.CUSTOMER_IO_SITE_ID;
const SITE_API_KEY = process.env.CUSTOMER_IO_API_KEY;
const TRACKING_API_KEY = process.env.CUSTOMER_IO_TRACKING_API_KEY;
const Authorization = `Bearer ${SITE_API_KEY}`;
const trackerCio = new TrackClient(SITE_ID, TRACKING_API_KEY, {
  region: RegionUS,
});
const apiCio = new APIClient(SITE_API_KEY, {region: RegionUS});

const toDateTime = secs => {
  const t = new Date("1970-01-01T00:30:00Z"); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

const getAllSupabaseUsers = async () => {
  const allUsers = [];
  let current = 0;
  const perPage = 50;

  console.log("Fetching all supabase users...");

  while (true) {
    const {data: users, error} = await supabaseAdmin
      .from("users")
      .select()
      .range(current * perPage, (current + 1) * perPage - 1);

    if (error) throw error;

    allUsers.push(...users);

    if (users.length < perPage) {
      break;
    }

    current++;
  }

  console.log(`Fetched ${allUsers.length} users from Supabase`);

  return allUsers;
};

const getAllStripeCustomers = async () => {
  let allCustomers = [];
  let lastId = null;
  const limit = 100;

  console.log("Fetching all stripe customers...");

  while (true) {
    const params = {
      limit,
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

const getAllCioCustomers = async () => {
  const allCustomers = [];
  let nextStart = "";
  const limit = 100;

  console.log("Fetching all customer.io customers...");

  while (true) {
    const response = await axios({
      method: "POST",
      url: `https://api.customer.io/v1/customers?start=${nextStart}&limit=${limit}`,
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
      data: {
        filter: {
          and: [
            {
              segment: {id: CUSTOMER_IO_SEGMENT_ID},
            },
          ],
        },
      },
    });

    allCustomers.push(...response.data.identifiers);

    if (response.data.identifiers.length < limit) {
      break; // Exit the loop if there's no more data
    }

    nextStart = response.data.next;
  }

  console.log(`Fetched ${allCustomers.length} customers from Customer.io`);

  return allCustomers;
};

const getCioCustomerAttributes = async ({id}) => {
  const options = {
    method: "GET",
    url: `https://api.customer.io/v1/customers/${id}/attributes`,
    headers: {
      Authorization,
    },
  };

  const {
    data: {
      customer: {attributes},
    },
  } = await axios(options);

  return attributes;
};

const getAllStripeSubscriptions = async () => {
  let allSubscriptions = [];
  let lastSubscriptionId = null;
  const limit = 100;

  while (true) {
    const params = {
      limit,
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
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  }

  console.log(`Fetched ${allSubscriptions.length} subscriptions from Stripe`);

  return allSubscriptions;
};

const getAllSupabaseSubscriptions = async () => {
  const {data, error} = await supabaseAdmin.from("subscriptions").select();

  if (error) {
    console.error(`Error fetching supabase subscriptions: ${error.message}`);
    return null;
  }

  return data;
};

const upsertSupabaseUserRecord = async userData => {
  const {email} = userData;
  const {error} = await supabaseAdmin.from("users").upsert([userData]);

  if (error) {
    console.error(
      `Error updating user full_name with email ${email}: ${error.message}`,
    );
    throw error;
  }
};

const upsertSupabaseCustomerRecord = async customerData => {
  const {id, stripe_customer_id} = customerData;
  const {error} = await supabaseAdmin.from("customers").upsert(customerData);

  if (error) {
    console.error(`Error inserting into customers table: ${error.message}`);
    throw error;
  }

  console.log(`Customer updated: ${id}, ${stripe_customer_id}`);
};

const copyBillingDetailsToCustomer = async (uuid, payment_method) => {
  const customer = payment_method.customer;
  const {name, phone, address} = payment_method.billing_details;
  if (!name || !phone || !address) return;

  await stripe.customers.update(customer, {name, phone, address});
  const {error} = await supabaseAdmin
    .from("users")
    .update({
      billing_address: {...address},
      payment_method: {...payment_method[payment_method.type]},
    })
    .eq("id", uuid);
  if (error) throw error;
};

const manageSubscriptionStatusChange = async (
  subscriptionId,
  customerId,
  createAction = false,
) => {
  // Get customer's UUID from mapping table.
  const {data: customerData, error: noCustomerError} = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  const {id: uuid} = customerData;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
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
      subscription.current_period_start,
    ).toISOString(),
    current_period_end: toDateTime(
      subscription.current_period_end,
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
      : null,
  };

  const {error} = await supabaseAdmin
    .from("subscriptions")
    .upsert([subscriptionData]);
  if (error) throw error;
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`,
  );

  const {error: updateError} = await supabaseAdmin
    .from("users")
    .update({subscription_id: subscription.id})
    .eq("id", uuid)
    .select()
    .single();
  if (updateError) throw error;
  console.log(
    `Updated subscription_id [${subscription.id}] for user [${uuid}]`,
  );

  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method,
    );
};

const removeCanceledSupabaseSubscriptions = async subscriptionIds => {
  const {error: updateError} = await supabaseAdmin
    .from("users")
    .update({subscription_id: null})
    .not("subscription_id", "in", `(${subscriptionIds})`);
  if (updateError) {
    console.error(
      `Error updating user subscription_id: ${updateError.message}`,
    );
    throw updateError;
  }
  console.log("Updated user subscription_id");

  const {error: deleteError} = await supabaseAdmin
    .from("subscriptions")
    .delete()
    .not("id", "in", `(${subscriptionIds})`);
  if (deleteError) {
    console.error(
      `Error updating user subscription_id: ${deleteError.message}`,
    );
    throw deleteError;
  }
  console.log("Updated subscription records");
};

const removeNonExistingStripeCustomers = async ({customers}) => {
  for (let customer of customers) {
    const {data: customerData, error} = await supabaseAdmin
      .from("customers")
      .select()
      .eq("stripe_customer_id", customer.id);

    if (error) {
      console.error(`Error fetching customer: ${error.message}`);
      throw error;
    }

    if (customerData.length) continue;

    await stripe.customers.del(customer.id);

    console.log(`Deleted stripe customer: ${customer.id}`);
  }
};

const removeNonExistingStripeSubscriptions = async ({
  subscriptions: supabaseSubscriptions,
}) => {
  const subscriptions = await getAllStripeSubscriptions();
  const nonExistingSubscriptionIds = subscriptions
    .filter(
      item =>
        !supabaseSubscriptions.find(
          subscription => subscription.id === item.id,
        ),
    )
    .map(item => item.id);

  for (let subscriptionId of nonExistingSubscriptionIds) {
    await stripe.subscriptions.cancel(subscriptionId);
    console.log(`Deleted stripe subscription: ${subscriptionId}`);
  }
};

const updateSupabaseFromStripe = async ({users, customers, subscriptions}) => {
  console.log(
    `--------------------------------------------------------------------------`,
  );
  for (let customer of customers) {
    let supabaseUser = users.find(user => user.email === customer.email);

    console.log(`Processing Supabase user with email ${customer.email}`);
    if (supabaseUser) {
      console.log(
        `Supabase User with the same email already exists: ${supabaseUser.email}`,
      );

      const userData = {
        id: supabaseUser.id,
        email: customer.email,
        full_name: customer.name,
      };

      await upsertSupabaseUserRecord(userData);

      console.log(
        `User full_name updated with email ${customer.email}: ${customer.full_name}`,
      );
    } else {
      const {
        data: {user},
        error,
      } = await supabaseAdmin.auth.admin.createUser({
        email: customer.email,
        password: process.env.SUPABASE_AUTH_USER_DEFAULT_PASSWORD || "12345678",
        email_confirm: true,
      });

      if (error) {
        console.error(
          `Error creating user with email ${user.email}: ${error.message}`,
        );
        throw error;
      }

      const userData = {
        id: user.id,
        full_name: customer.name,
      };

      const {error: upsertError} = await supabaseAdmin
        .from("users")
        .upsert([userData]);

      if (upsertError) {
        console.error(
          `Error creating user full_name with email ${user.email}: ${error.message}`,
        );
        throw upsertError;
      }

      console.log(`User created with email ${user.email}: ${user.id}`);
    }

    const customerData = {
      id: supabaseUser.id,
      stripe_customer_id: customer.id,
    };
    await upsertSupabaseCustomerRecord(customerData);

    const subscription = subscriptions.find(
      item => item.customer === customer.id,
    );

    if (subscription) {
      await manageSubscriptionStatusChange(
        subscription.id,
        subscription.customer,
        !supabaseUser.subscription_id,
      );
    }

    console.log(`Supabase user process with email ${customer.email} completed`);
    console.log(
      `--------------------------------------------------------------------------`,
    );
  }

  await removeCanceledSupabaseSubscriptions(subscriptions.map(item => item.id));
};

const updateStripeFromSupabase = async ({users, customers, subscriptions}) => {
  console.log(
    `--------------------------------------------------------------------------`,
  );
  for (let user of users) {
    let stripeCustomer = customers.find(
      customer => customer.email === user.email,
    );

    console.log("user.full_name", user.full_name);

    if (stripeCustomer) {
      console.log(
        `Stripe customer with the same email already exists: ${user.email}`,
      );

      const updatedCustomer = await stripe.customers.update(stripeCustomer.id, {
        name: user.full_name,
      });

      console.log(
        `Stripe customer name updated with email ${updatedCustomer.email}: ${updatedCustomer.name}`,
      );
    } else {
      stripeCustomer = await stripe.customers.create({
        email: user.email,
        name: user.full_name,
      });
      console.log(
        `Stripe customer created with email ${user.email}: ${stripeCustomer.id}`,
      );
    }

    const customerData = {
      id: user.id,
      stripe_customer_id: stripeCustomer.id,
    };
    await upsertSupabaseCustomerRecord(customerData);

    console.log(`Stripe customer process with email ${user.email} completed`);
    console.log(
      `--------------------------------------------------------------------------`,
    );
  }

  await removeNonExistingStripeCustomers({users, customers});
  await removeNonExistingStripeSubscriptions({subscriptions});
};

const updateSupabaseFromCio = async ({users, customers}) => {
  console.log(
    `--------------------------------------------------------------------------`,
  );
  for (let customer of customers) {
    let supabaseUser = users.find(user => user.email === customer.email);
    const data = await getCioCustomerAttributes({id: customer.cio_id});
    const customerName = data.Name || null;

    console.log(`Processing Supabase user with email ${customer.email}`);
    if (supabaseUser) {
      console.log(
        `Supabase User with the same email already exists: ${supabaseUser.email}`,
      );

      const userData = {
        id: supabaseUser.id,
        email: customer.email,
        full_name: customerName,
      };

      await upsertSupabaseUserRecord(userData);

      console.log(
        `User full_name updated with email ${userData.email}: ${userData.full_name}`,
      );
    } else {
      const {
        data: {user},
        error,
      } = await supabaseAdmin.auth.admin.createUser({
        email: customer.email,
        password: process.env.SUPABASE_AUTH_USER_DEFAULT_PASSWORD || "12345678",
        email_confirm: true,
      });

      if (error) {
        console.error(
          `Error creating user with email ${user.email}: ${error.message}`,
        );
        throw error;
      }

      const userData = {
        id: user.id,
        email: customer.email,
        full_name: customerName,
      };

      await upsertSupabaseUserRecord(userData);

      console.log(`User created with email ${user.email}: ${user.id}`);
    }

    console.log(`Supabase user process with email ${customer.email} completed`);
    console.log(
      `--------------------------------------------------------------------------`,
    );
  }
};

const updateCioFromSupabase = async ({users, customers}) => {
  console.log(
    `--------------------------------------------------------------------------`,
  );
  for (let user of users) {
    let cioCustomer = customers.find(customer => customer.email === user.email);

    if (cioCustomer) {
      console.log(
        `Customer.io customer with the same email already exists: ${user.email}`,
      );

      trackerCio.identify(cioCustomer.cio_id, {
        created_at: user.created_at,
        full_name: user.full_name,
      });

      console.log(
        `Customer.io customer name updated with email ${user.email}: ${user.full_name}`,
      );
    } else {
      const cio_id = crypto
        .createHash("sha256")
        .update(user.email)
        .digest("hex")
        .slice(0, 12);

      trackerCio.identify(cio_id, {
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
      });
      console.log(
        `Customer.io customer created with email ${user.email}: ${cio_id}`,
      );
    }

    console.log(
      `Customer.io customer process with email ${user.email} completed`,
    );
    console.log(
      `--------------------------------------------------------------------------`,
    );
  }
};

module.exports = {
  toDateTime,
  getAllSupabaseUsers,
  getAllStripeCustomers,
  getAllCioCustomers,
  getAllStripeSubscriptions,
  getAllSupabaseSubscriptions,
  getCioCustomerAttributes,
  removeNonExistingStripeCustomers,
  removeNonExistingStripeSubscriptions,
  upsertSupabaseUserRecord,
  upsertSupabaseCustomerRecord,
  copyBillingDetailsToCustomer,
  manageSubscriptionStatusChange,
  updateSupabaseFromStripe,
  updateStripeFromSupabase,
  updateSupabaseFromCio,
  updateCioFromSupabase,
  removeCanceledSupabaseSubscriptions,
};
