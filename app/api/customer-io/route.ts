// app/api/customer-io/route.ts
import crypto from 'crypto';
import { trackerCio, apiCio } from '../../../lib/cioClient';
import { createAuthUser } from '@/utils/supabase-admin';

export async function PUT(req: Request) {
  const body = await req.json();
  const { email, existingUser, subscription } = body;

  try {
    if (!existingUser) {
      await createAuthUser(email);
    }

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
