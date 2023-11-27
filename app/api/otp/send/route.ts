import {sendOTP} from "@/lib/supabase/functions/otp";

export async function POST(req: Request) {
  const body = await req.json();
  const {email} = body;

  try {
    const {error} = await sendOTP(email);

    if (error) throw error;

    return new Response(JSON.stringify({success: true}), {status: 200});
  } catch (err) {
    return new Response(`${err.message}`, {status: 500});
  }
}
