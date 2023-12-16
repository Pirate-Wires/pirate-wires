import { setDefaultPaymentMethod, createCustomerSubscription } from "@/lib/utils/stripe";
import { getUserByEmail, getCustomerById } from "@/lib/utils/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paymentMethodId, email, priceId } = body;

    const user = await getUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ message: "Error fetching user data" }), { status: 400 });
    }

    const customerData = await getCustomerById(user.id);
    if (!customerData) {
      return new Response(JSON.stringify({ message: "Error fetching customer data" }), { status: 400 });
    }

    const customerId = customerData.stripe_customer_id!;

    const { error } = await setDefaultPaymentMethod({
      paymentMethodId,
      customerId,
    });

    if (error) throw error;

    const { data: subscriptionId, error: subscriptionError } = await createCustomerSubscription(customerId, priceId);

    if (subscriptionError) throw error;

    return new Response(JSON.stringify({ subscriptionId }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
