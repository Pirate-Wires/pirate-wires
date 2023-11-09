
import { getCustomerId } from '@/lib/cioClient';
import { getCustomerSubscription } from '@/utils/cio-api';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(`Query Error`, { status: 500 });
  }

  try {
    const cioId = await getCustomerId(email);
    const customerSubscription = await getCustomerSubscription(cioId);

    return new Response(JSON.stringify({ preferences: customerSubscription }), { status: 200 });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}