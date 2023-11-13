import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: 'Next.js Subscription Starter',
      version: '0.1.0'
    }
  }
);

const TRIAL_PERIOD_DAYS = parseInt(process.env.NEXT_PUBLIC_SUBSCRIBE_TRIAL_PERIOD_DAYS!);

export const createPaymentIntent = async (customerId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1200,
      currency: 'usd',
      customer: customerId,
      payment_method_types: ['card'],
      setup_future_usage: 'on_session'
    });

    return { data: paymentIntent.client_secret, error: null };
  } catch (error) {
    console.error(`Error creating payment intent: ${error.message}`);
    return { data: null, error };
  }
};

export const createCustomerSubscription = async (
  customerId: string,
  priceId: string
) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: TRIAL_PERIOD_DAYS
    });
    return { data: subscription.id, error: null };
  } catch (error) {
    console.error(`Error creating customer subscription: ${error.message}`);
    return { data: null, error };
  }
};
