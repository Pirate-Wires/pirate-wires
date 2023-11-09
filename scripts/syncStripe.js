require('dotenv').config({ path: './.env.local' })
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getAllSupabaseUsers() {
  const allUsers = [];
  let current = 1;
  const perPage = 50;

  while(true) {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
      page: current++,
      perPage: perPage
    });

    allUsers.push(...users);

    if(users.length < perPage) {
      break;
    }
  }

  return allUsers;
}

async function getAllStripeCustomers() {
    let allCustomers = [];
    let lastId = null;
    const limit = 100;

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

    return allCustomers;
}

async function createStripeCustomers(users, customers) {
  for(let user of users) {
    let stripeCustomer = customers.find(customer => customer.email === user.email);

    if(stripeCustomer) {
      console.log(`Stripe customer with the same email already exists: ${user.email}`);
    } else {
      stripeCustomer = await stripe.customers.create({
        email: user.email,
      });
      console.log(`Stripe customer created: ${stripeCustomer.id}`);
    }

    const { error : insertError } = await supabaseAdmin
      .from('customers')
      .insert({ id: user.id, stripe_customer_id: stripeCustomer.id });

    if(insertError) {
      console.error(`Error inserting into customers table: ${insertError.message}`);
      return;
    }
    console.log(`Customer inserted: ${user.id}, ${stripeCustomer.id}`);
  }
}

async function createSupabaseUsers(users, customers) {
  for(let customer of customers) {
    let supabaseUser = users.find(user => user.email === customer.email);

    if(supabaseUser) {
      console.log(`Supabase User with the same email already exists: ${user.email}`);
    } else {
      const { data: { user }, error } = await supabaseAdmin.auth.admin.createUser({
        email: customer.email,
        password: '12345678',
        email_confirm: true,
      });

      if (error) {
        console.error(`Error creating user: ${error.message}`);
        return;
      }

      console.log(`User created:${user.id}`);
    }
  }
}

async function processSync() {
  try {
    let users = await getAllSupabaseUsers();
    let customers = await getAllStripeCustomers();

    console.log('Creating Supabase users depending customers in Stripe ...');
    await createSupabaseUsers(users, customers);

    users = await getAllSupabaseUsers();
    customers = await getAllStripeCustomers();

    console.log('Creating Stripe customers depending users in Supabase ...');
    await createStripeCustomers(users, customers);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
}

console.log('Starting...');
processSync();