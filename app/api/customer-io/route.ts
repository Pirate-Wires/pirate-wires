// app/api/customer-io/route.ts
import crypto from 'crypto';
import { trackerCio, apiCio, getCustomerId } from '@/lib/cioClient';
import { createAuthUser } from '@/utils/supabase-admin';
import { getCustomerSubscription } from '@/utils/cio-api';

export async function PUT(req: Request) {
  const body = await req.json();
  const { email, subscription } = body;

  try {
    await createAuthUser(email);

    const response = await apiCio.getCustomersByEmail(email!);
    const customer = response.results[0];
    const topics = ['Wires', 'The Industry', 'The White Pill'];

    if (customer) {
      trackerCio.identify(`cio_${customer.cio_id}`, {
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
    const customerSubscription = await getCustomerSubscription(cioId);
    const subscription = customerSubscription.indexOf(section) > -1 ? customerSubscription : [...customerSubscription, section];
    const topics = ['Wires', 'The Industry', 'The White Pill'];

    console.log(email, subscription);

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
