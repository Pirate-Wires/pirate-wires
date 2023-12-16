import { createPaymentIntent } from "@/lib/utils/stripe";
import { getUserByEmail, getCustomerById } from "@/lib/utils/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const user = await getUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ message: "Error fetching user data" }), { status: 400 });
    }

    const customerData = await getCustomerById(user.id);
    if (!customerData) {
      return new Response(JSON.stringify({ message: "Error fetching customer data" }), { status: 400 });
    }

    const { data: clientSecret, error } = await createPaymentIntent(customerData?.stripe_customer_id!);
    if (error) throw error;

    return new Response(JSON.stringify({ clientSecret }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
