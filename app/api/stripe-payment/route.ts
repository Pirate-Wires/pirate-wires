import {createPaymentIntent} from "@/utils/stripe";

export async function POST(req: Request) {
  const body = await req.json();
  const {customerId} = body;
  try {
    const {data: clientSecret, error} = await createPaymentIntent(customerId);

    if (error) throw error;

    return new Response(JSON.stringify({clientSecret}), {status: 200});
  } catch (err) {
    return new Response(`${err.message}`, {status: 500});
  }
}
