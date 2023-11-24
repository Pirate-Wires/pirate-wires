// supabse/functions/otp/index.ts
// c.io transactional email for OTP
// transactional email template id: 3
import { createClient } from '@supabase/supabase-js';
import { APIClient, SendEmailRequest } from 'customerio-node';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const client = new APIClient(process.env.CUSTOMER_IO_API_KEY || '');

const OTP_VALIDITY_DURATION = 15 * 60 * 1000;
const CIO_MESSAGE_ID = 3;

const generateOTP = (length: number = 6): string => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

export const sendOTP = async (email: string) => {
  const otp = generateOTP();
  const otpHash = crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex');
  const currentTime = new Date().toISOString();

  const { data, error } = await supabase
    .from('otps')
    .select()
    .eq('email', email);

  if (error) {
    console.error('Error fetching OTP:', error);
    return { error };
  }

  if(data?.length) {
    const { error } = await supabase
      .from('otps')
      .update({ otp: otpHash, created_at: currentTime})
      .eq('email', email);

    if (error) {
      console.error('Error updating OTP:', error);
      return { error };
    }
  } else {
    const { error } = await supabase
      .from('otps')
      .insert({ email, otp: otpHash, created_at: currentTime});

    if (error) {
      console.error('Error inserting OTP:', error);
      return { error };
    }
  }

  await sendEmailWithOTP(email, otp);
  return { error: null };
};

export const verifyOTP = async (email: string, inputOtp: string) => {
  const { data, error } = await supabase
    .from('otps')
    .select('otp, created_at')
    .eq('email', email)
    .single();

  if (error || !data) {
    console.error('Error fetching OTP:', error);
    return { error };
  }

  const otp = data.otp;
  const createdAt = new Date(data.created_at);
  const currentTime = new Date();
  const inputOtpHash = crypto
    .createHash('sha256')
    .update(inputOtp)
    .digest('hex');

  if (
    currentTime.getTime() - createdAt.getTime() < OTP_VALIDITY_DURATION &&
    otp === inputOtpHash
  ) {
    return { error: null };
  }

  return { error: new Error(`Token has expired or is invalid`)};
};

const sendEmailWithOTP = async (
  email: string,
  token: string
): Promise<boolean> => {
  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (error || !user) {
    console.error('Error fetching user:', error);
    return false;
  }

  const request = new SendEmailRequest({
    transactional_message_id: `${CIO_MESSAGE_ID}`,
    message_data: {
      token
    },
    identifiers: {
      id: user.id
    },
    to: email
  });

  await client.sendEmail(request);
  return true;
};
