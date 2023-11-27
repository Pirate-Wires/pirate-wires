import {
  setDefaultPaymentMethod,
  createCustomerSubscription,
} from "@/utils/stripe";

export async function POST(req: Request) {
  const body = await req.json();
  const {paymentMethodId, customerId, priceId} = body;
  try {
    const {error} = await setDefaultPaymentMethod({
      paymentMethodId,
      customerId,
    });

    if (error) throw error;

    const {data: subscriptionId, error: subscriptionError} =
      await createCustomerSubscription(customerId, priceId);

    if (subscriptionError) throw error;

    return new Response(JSON.stringify({subscriptionId}), {status: 200});
  } catch (err) {
    return new Response(`${err.message}`, {status: 500});
  }
}
