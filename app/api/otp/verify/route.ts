import { verifyOTP } from "@/lib/supabase/functions/otp";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, otp } = body;
  try {
    const { error } = await verifyOTP(email, otp);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(`${err.message}`, { status: 500 });
  }
}
