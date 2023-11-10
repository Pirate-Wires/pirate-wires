
import crypto from 'crypto';
import {
  trackerCio,
  getCustomerId,
  getCustomerSubscription
} from '@/lib/cioClient';
import { createAuthUser } from '@/utils/supabase-admin';

export async function PUT(req: Request) {
  const body = await req.json();
  const { email, subscription } = body;

  try {
    await createAuthUser(email);

    const cioId = getCustomerId(email);
    const topics = ['Wires', 'The Industry', 'The White Pill'];

    if (cioId) {
      trackerCio.identify(`cio_${cioId}`, {
        cio_subscription_preferences: `{
          "topics": {
            ${topics
              .map(
                (item, index) =>
                  `"topic_${index + 1}": ${subscription.indexOf(item) > -1}`
              )
              .join(',')}
          }
        }`
      });
    } else {
      const cio_id = crypto
        .createHash('sha256')
        .update(email)
        .digest('hex')
        .slice(0, 12);
      trackerCio.identify(cio_id, {
        email,
        cio_subscription_preferences: `{
          "topics": {
            ${topics
              .map(
                (item, index) =>
                  `"topic_${index + 1}": ${subscription.indexOf(item) > -1}`
              )
              .join(',')}
          }
        }`
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, section } = body;

  try {
    await createAuthUser(email);

    const cioId = await getCustomerId(email);
    const { data } = await getCustomerSubscription(email);
    const customerSubscription = data || [];

    if (customerSubscription.indexOf(section) > -1) {
      return new Response(
        JSON.stringify({ message: `You've subscribed already.` }),
        { status: 200 }
      );
    }

    const subscription =
      customerSubscription.indexOf(section) > -1
        ? customerSubscription
        : [...customerSubscription, section];
    const topics = ['Wires', 'The Industry', 'The White Pill'];

    if (cioId) {
      trackerCio.identify(`cio_${cioId}`, {
        cio_subscription_preferences: `{
          "topics": {
            ${topics
              .map(
                (item, index) =>
                  `"topic_${index + 1}": ${subscription.indexOf(item) > -1}`
              )
              .join(',')}
          }
        }`
      });
    } else {
      const cio_id = crypto
        .createHash('sha256')
        .update(email)
        .digest('hex')
        .slice(0, 12);
      trackerCio.identify(cio_id, {
        email,
        cio_subscription_preferences: `{
          "topics": {
            ${topics
              .map(
                (item, index) =>
                  `"topic_${index + 1}": ${subscription.indexOf(item) > -1}`
              )
              .join(',')}
          }
        }`
      });
    }

    return new Response(JSON.stringify({ message: `Thanks for subscribing` }), {
      status: 200
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(`Query Error`, { status: 500 });
  }

  try {
    const { data: subscription, error } = await getCustomerSubscription(email);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ preferences: subscription }), {
      status: 200
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}