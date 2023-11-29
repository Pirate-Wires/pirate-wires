import {serve} from "https://deno.land/std@0.208.0/http/server.ts";

const CUSTOMER_IO_API_KEY = Deno.env.get("CUSTOMER_IO_API_KEY");
const aesSecretKey = Deno.env.get("AES_SECRET_KEY");

const Authorization = `Bearer ${CUSTOMER_IO_API_KEY}`;
const CIO_MESSAGE_ID = 3;

const sendOTPMail = async record => {
  const {email, otp} = record;

  const res = await fetch("https://api.customer.io/v1/send/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
    body: JSON.stringify({
      transactional_message_id: `${CIO_MESSAGE_ID}`,
      message_data: {
        token: otp,
      },
      identifiers: {
        email,
      },
      to: email,
    }),
  });

  const data = await res.json();

  if (data.meta) {
    console.log(`Error sending email to ${email}: ${data.meta.error}`);
    return null;
  }

  console.log(`Sent otp email to ${email}: ${otp}`);
  return data.delivery_id;
};

serve(async req => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({error: "Method Not Allowed"}), {
      status: 405,
      headers: {"Content-Type": "application/json"},
    });
  }

  const payload = await req.json();

  console.log("Webhook received:", payload);

  await sendOTPMail(payload.record);

  return new Response(
    JSON.stringify({message: "Webhook received successfully!"}),
    {status: 200, headers: {"Content-Type": "application/json"}},
  );
});
