// /app/api/customer-io/preferences/route.ts
import crypto from 'crypto';
import {
  trackerCio,
  getCustomerId,
  getCustomerSubscription
} from '@/lib/cioClient';
import { createAuthUser } from '@/utils/supabase-admin';
import { CustomerIORequestError } from 'customerio-node';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, subscription } = body;

    await createAuthUser(email);

    const cioId = await getCustomerId(email);
    const { data: currentSubscription, error } = await getCustomerSubscription(
      email
    );

    console.log('currentSubscription', currentSubscription);

    if (error) {
      throw error;
    }

    const topics = {
      topicWires: 'Wires',
      topicTheWhitePill: 'The White Pill',
      topicTheIndustry: 'The Industry',
      topicDoloresPark: 'Dolores Park',
      topicImportantPirateWiresUpdates: 'Important Pirate Wires Updates'
    };

    // Topics in customer.io are given an id number in the order in which they were created. Re-ordering them in the UI will not change their id number.
    // 1	Wires
    // 2	The Industry
    // 3	The White Pill
    // 5	Dolores Park
    // 4	Important Pirate Wires Updates

    const updatedPreferences = {};
    Object.keys(topics).forEach((key, index) => {
      updatedPreferences[`topic_${index + 1}`] = subscription.includes(
        topics[key]
      );
    });

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

    const topics = {
      topicWires: 'Wires',
      topicTheWhitePill: 'The White Pill',
      topicTheIndustry: 'The Industry',
      topicDoloresPark: 'Dolores Park',
      topicImportantPirateWiresUpdates: 'Important Pirate Wires Updates'
    };

    const updatedPreferences = {};
    Object.keys(topics).forEach((key, index) => {
      updatedPreferences[`topic_${index + 1}`] = subscription.includes(
        topics[key]
      );
    });

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
