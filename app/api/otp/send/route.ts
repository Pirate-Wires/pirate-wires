import { upsertOTPRecord } from "@/utils/supabase-admin";
import { verifyEmail } from "@/utils/kickbox";

const encryptKey = process.env.SUPABASE_OTP_ENC_DEC_KEY || "0f65436ac418";

const generateOTP = (length: number = 6): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

const shiftChar = (char: string, keyChar: string): number => {
  const charCode = char.charCodeAt(0);
  const keyCharCode = keyChar.charCodeAt(0);
  return (charCode + keyCharCode) % 256;
};

const toHexString = (byteArray: number[]): string =>
  byteArray.map(byte => ("0" + (byte & 0xff).toString(16)).slice(-2)).join("");

const encrypt = (otp: string, key: string): string => {
  const byteArray = Array.from(otp).map((char, i) => shiftChar(char, key[i % key.length]));
  return toHexString(byteArray);
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const { data: result, error: verifyError } = await verifyEmail(email);

    if (verifyError) {
      return new Response(JSON.stringify({ message: "Error verifying Email" }), { status: 500 });
    } else if (!result) {
      return new Response(JSON.stringify({ message: "Invalid Email Address" }), { status: 400 });
    }

    const otp = generateOTP();
    const encryptedOTP = encrypt(otp, encryptKey);

    const { error } = await upsertOTPRecord(email, encryptedOTP);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(`${err.message}`, { status: 500 });
  }
}
