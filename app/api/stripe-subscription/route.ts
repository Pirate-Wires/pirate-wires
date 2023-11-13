import { createCustomerSubscription } from '@/utils/stripe';

export async function POST(req: Request) {
  const body = await req.json();
  const { customerId, priceId } = body;
  try {
    const { data: subscriptionId, error } = await createCustomerSubscription(
      customerId,
      priceId
    );

    if (error) throw error;

    return new Response(JSON.stringify({ subscriptionId }), { status: 200 });
  } catch (err) {
    return new Response(`${err.message}`, { status: 500 });
  }
}
