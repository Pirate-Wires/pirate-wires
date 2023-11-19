// /app/api/customer-io/preferences/route.ts
import crypto from 'crypto';
import {
  trackerCio,
  getCustomerId,
  getCustomerSubscription
} from '@/lib/cioClient';
import { createAuthUser } from '@/utils/supabase-admin';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, subscription } = body;

    await createAuthUser(email);

    const cioId = await getCustomerId(email);
    const { data: currentSubscription, error } = await getCustomerSubscription(
      email
    );

    if (error) {
      throw error;
    }

    const topics = ['Wires', 'The Industry', 'The White Pill'];

    const updatedPreferences = topics.reduce((acc, item, index) => {
      acc[`topic_${index + 1}`] = subscription.includes(item);
      return acc;
    }, {});

    const preferencesPayload = {
      cio_subscription_preferences: JSON.stringify({
        topics: updatedPreferences
      })
    };

    if (cioId) {
      trackerCio.identify(`cio_${cioId}`, preferencesPayload);
    } else {
      const cio_id = crypto
        .createHash('sha256')
        .update(email)
        .digest('hex')
        .slice(0, 12);

      trackerCio.identify(cio_id, {
        email,
        ...preferencesPayload
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Error in PUT request:', err);
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, section } = body;

    await createAuthUser(email);

    const cioId = await getCustomerId(email);
    const { data } = await getCustomerSubscription(email);
    const customerSubscription = data || [];

    const subscription = customerSubscription.includes(section)
      ? customerSubscription.filter((item) => item !== section)
      : [...customerSubscription, section];

    const topics = ['Wires', 'The Industry', 'The White Pill'];

    const updatedPreferences = topics.reduce((acc, item, index) => {
      acc[`topic_${index + 1}`] = subscription.includes(item);
      return acc;
    }, {});

    const preferencesPayload = {
      cio_subscription_preferences: JSON.stringify({
        topics: updatedPreferences
      })
    };

    if (cioId) {
      trackerCio.identify(`cio_${cioId}`, preferencesPayload);
    } else {
      const cio_id = crypto
        .createHash('sha256')
        .update(email)
        .digest('hex')
        .slice(0, 12);

      trackerCio.identify(cio_id, {
        email,
        ...preferencesPayload
      });
    }

    return new Response(JSON.stringify({ message: `Thanks for subscribing` }), {
      status: 200
    });
  } catch (err) {
    console.error('Error in POST request:', err);
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
