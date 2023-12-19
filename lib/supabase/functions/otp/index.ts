// supabse/functions/otp/index.ts
// c.io transactional email for OTP
// transactional email template id: 3
import { createClient } from "@supabase/supabase-js";
import { APIClient, SendEmailRequest } from "customerio-node";
import crypto from "crypto";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

const client = new APIClient(process.env.CUSTOMER_IO_API_KEY || "");

const OTP_VALIDITY_DURATION = 15 * 60 * 1000;
const CIO_MESSAGE_ID = 3;

const sendEmailWithOTP = async (email: string, token: string): Promise<boolean> => {
  const { data: user, error } = await supabase.from("users").select("id").eq("email", email).single();

  if (error || !user) {
    return false;
  }

  const request = new SendEmailRequest({
    transactional_message_id: `${CIO_MESSAGE_ID}`,
    message_data: {
      token,
    },
    identifiers: {
      id: user.id,
    },
    to: email,
  });

  await client.sendEmail(request);
  return true;
};
