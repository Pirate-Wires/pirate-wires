// import {serve} from "https://deno.land/std@0.208.0/http/server.ts";

// const CUSTOMER_IO_API_KEY = Deno.env.get("CUSTOMER_IO_API_KEY");

// const Authorization = `Bearer ${CUSTOMER_IO_API_KEY}`;
// const CIO_MESSAGE_ID = "change-email";

// const sendChangeEmail = async (oldEmail, newEmail) => {
//   const res = await fetch("https://api.customer.io/v1/send/email", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization,
//     },
//     body: JSON.stringify({
//       transactional_message_id: `${CIO_MESSAGE_ID}`,
//       message_data: {
//         newEmail, oldEmail
//       },
//       identifiers: {
//         email: oldEmail,
//       },
//       to: oldEmail,
//     }),
//   });

//   const data = await res.json();

//   if (data.meta) {
//     console.log(`Error sending email to ${oldEmail}: ${data.meta.error}`);
//     return null;
//   }

//   console.log(`Sent changed email to ${oldEmail}: ${newEmail}`);
//   return data.delivery_id;
// };

// serve(async req => {
//   if (req.method !== "POST") {
//     return new Response(JSON.stringify({error: "Method Not Allowed"}), {
//       status: 405,
//       headers: {"Content-Type": "application/json"},
//     });
//   }

//   try {
//     const payload = await req.json();

//     // Process payload
//     console.log("Webhook received:", payload);

//     const { record, old_record } = payload;
//     const { email: newEmail } = record;
//     const { email: oldEmail } = old_record;

//     if(newEmail === oldEmail) {
//       throw new Error(`Email hasn't changed`);
//     }

//     await sendChangeEmail(oldEmail, newEmail);

//     return new Response(JSON.stringify({newEmail: record.email}), {
//       headers: {"Content-Type": "application/json"},
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error.message);
//     return new Response(JSON.stringify({error: error.message}), {
//       headers: {"Content-Type": "application/json"},
//       status: 400,
//     });
//   }
// });
