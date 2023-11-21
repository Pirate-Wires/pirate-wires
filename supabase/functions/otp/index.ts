// supabse/functions/otp/index.ts
// c.io transactional email for OTP
// transactional email template id: 3
export default sendOTP((event) => {
  if (event.type === 'user_updated') {
    // Generate OTP token
    const { data } = await supabase.rpc('generate_otp_token', {
      email: event.user.email
    });

    // Send OTP code email with Customer.IO
    if (data) {
      sendOtpEmail(event.user.email, data.token);
    }
  }
});

async function sendOtpEmail(email, token) {
  // TODO - Send email confirmation code email
}
