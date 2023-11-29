import {verifyOTP} from "@/utils/supabase-admin";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const {email, otp} = body;
  const inputOtpHash = crypto.createHash("sha256").update(otp).digest("hex");

  try {
    const {error} = await verifyOTP(email, inputOtpHash);

    if (error) throw error;

    return new Response(JSON.stringify({success: true}), {status: 200});
  } catch (err) {
    return new Response(`${err.message}`, {status: 500});
  }
}
