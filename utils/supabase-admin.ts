// /utils/supabase-admin.ts
import { toDateTime } from './helpers';
import { stripe } from './stripe';
import type { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
type User = Database['public']['Tables']['users']['Row'];
type AuthUser = {
  email: string;
  password: string;
  email_confirm: boolean;
}

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white'
      // ..
    }
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e'
      //..
    }
  },
  // You can also add more theme variations with different names.
  evenDarker: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#1e1e1e',
      defaultButtonBackgroundHover: '#2e2e2e'
      //..
    }
  }
};

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };

  const { error } = await supabaseAdmin.from('products').upsert([productData]);
  if (error) throw error;
  console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? null,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? null,
    metadata: price.metadata
  };

  const { error } = await supabaseAdmin.from('prices').upsert([priceData]);
  if (error) throw error;
  console.log(`Price inserted/updated: ${price.id}`);
};

const createOrRetrieveCustomer = async ({
  uuid,
  email,
  name = '',
}: {
  uuid: string;
  email: string;
  name?: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', uuid)
    .single();
  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData: {
      metadata: { supabaseUUID: string };
      email?: string;
      name?: string;
    } = {
      metadata: {
        supabaseUUID: uuid
      }
    };
    if (email) customerData.email = email;
    if (name) customerData.name = name;
    const customer = await stripe.customers.create(customerData);
    // Now insert the customer ID into our Supabase mapping table.
    const { error: supabaseError } = await supabaseAdmin
      .from('customers')
      .insert([{ id: uuid, stripe_customer_id: customer.id }]);
    if (supabaseError) throw supabaseError;
    console.log(`New customer created and inserted for ${uuid}.`);
    return customer.id;
  }
  return data.stripe_customer_id;
};

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
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
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  const { id: uuid } = customerData!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });
  // Upsert the latest status of the subscription object.
  const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] =
    {
      id: subscription.id,
      user_id: uuid,
      metadata: subscription.metadata,
      status: subscription.status as
        | 'active'
        | 'trialing'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid'
        | null
        | undefined,
      price_id: subscription.items.data[0].price.id,
      //TODO check quantity on subscription
      // @ts-ignore
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
    .update({ subscription_id: subscription.id})
    .eq('id', uuid)
    .select()
    .single();
  if (updateError) throw error;
  console.log(
    `Updated subscription_id [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

const createAuthUser = async (email: string) => {
  const userData: AuthUser = {
    email: email,
    password: process.env.SUPABASE_AUTH_USER_DEFAULT_PASSWORD || '12345678' as string,
    email_confirm: true,
  };

  const { data: { user }, error } = await supabaseAdmin.auth.admin.createUser(userData);
  if (error) {
    return { data: null, error};
  }
  console.log(`Auth user created: ${user?.id}`);
  return { data: user, error: null};
};

const syncSupbaseUserWithStripe = async (customer: Stripe.Customer) => {
  const { data: user } = await createAuthUser(customer.email!);

  const { error } = await supabaseAdmin
    .from('customers')
    .upsert({ id: user?.id!, stripe_customer_id: customer.id});

  if (error) throw error;

  console.log(`Customer inserted/updated: ${user?.id}`);

  const { data: updatedUser, error: updateError } = await supabaseAdmin
    .from('users')
    .update({ full_name: customer.name })
    .eq('id', user?.id!)
    .select()
    .single();

  if (updateError) throw updateError;

  console.log(`User full_name updated for ${updatedUser?.id}: ${updatedUser?.full_name}`);
};

const getUserByEmail = async (email: string) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select()
    .eq('email', email)
    .single();

  if(error) {
    console.log(`Error fetching post data: ${error.message}`);
    return null;
  }

  return data;
}

const upsertUserRecord = async (
  id: string,
  email: string,
  full_name: string
) => {
  const userData: User = {
    id,
    full_name,
    email,
  };

  const { error } = await supabaseAdmin.from('users').upsert([userData]);
  if (error) return { error };
  console.log(`User inserted/updated: ${id}`);
  return { error: null};
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
  createAuthUser,
  syncSupbaseUserWithStripe,
  getUserByEmail,
  upsertUserRecord
};
