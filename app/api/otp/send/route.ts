import {upsertOTPRecord} from "@/utils/supabase-admin";

const generateOTP = (length: number = 6): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

export async function POST(req: Request) {
  const body = await req.json();
  const {email} = body;

  const otp = generateOTP();

  try {
    const {error} = await upsertOTPRecord(email, otp);

    if (error) throw error;

    return new Response(JSON.stringify({success: true}), {status: 200});
  } catch (err) {
    return new Response(`${err.message}`, {status: 500});
  }
}
