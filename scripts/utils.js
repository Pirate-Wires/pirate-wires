require('dotenv').config({ path: './.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

const updateSupabaseUsersFromStripe = async ({ users, customers }) => {
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

      const { error: upsertError } = await supabaseAdmin
        .from('users')
        .upsert([userData]);

      if (upsertError) {
        console.error(
          `Error updating user full_name with email ${supabaseUser.email}: ${error.message}`
        );
        throw upsertError;
      }

      console.log(
        `User full_name updated with email ${supabaseUser.email}: ${supabaseUser.full_name}`
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
    console.log(`Supabase user process with email ${customer.email} completed`);
    console.log(
      `--------------------------------------------------------------------------`
    );
  }
};

const updateStripeCustomersFromSupabase = async ({ users, customers }) => {
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

    const { error: insertError } = await supabaseAdmin
      .from('customers')
      .upsert([{ id: user.id, stripe_customer_id: stripeCustomer.id }]);

    if (insertError) {
      console.error(
        `Error inserting into customers table: ${insertError.message}`
      );
      throw insertError;
    }
    console.log(`Customer updated: ${user.id}, ${stripeCustomer.id}`);
    console.log(`Stripe customer process with email ${user.email} completed`);
    console.log(
      `--------------------------------------------------------------------------`
    );
  }
};

const updateSupabaseUsersFromCio = async ({ users, customers }) => {
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

      const { error: upsertError } = await supabaseAdmin
        .from('users')
        .upsert([userData]);

      if (upsertError) {
        console.error(
          `Error updating user full_name with email ${supabaseUser.email}: ${error.message}`
        );
        throw upsertError;
      }

      console.log(
        `User full_name updated with email ${supabaseUser.email}: ${supabaseUser.full_name}`
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
    console.log(`Supabase user process with email ${customer.email} completed`);
    console.log(
      `--------------------------------------------------------------------------`
    );
  }
};

module.exports = {
  getAllSupabaseUsers,
  getAllStripeCustomers,
  updateSupabaseUsersFromStripe,
  updateStripeCustomersFromSupabase,
  updateSupabaseUsersFromCio
};
