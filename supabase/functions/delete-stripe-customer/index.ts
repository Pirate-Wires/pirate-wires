// import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

// const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
// const Authorization = `Bearer ${STRIPE_SECRET_KEY}`;

// const deleteStripeCustomer = async record => {
//   const { email } = record;

//   const getResponse = await fetch(`https://api.stripe.com/v1/customers?email=${email}`, {
//     method: "GET",
//     headers: {
//       Authorization,
//     },
//   });
//   const { data: customerData } = await getResponse.json();

//   if (!customerData) {
//     console.error(`Error fetching stripe customer detail: ${email}`);
//     return null;
//   }

//   if (customerData.length) {
//     const customer = customerData[0];
//     const { id: customerId } = customer;

//     const deleteResponse = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization,
//       },
//     });

//     const data = await deleteResponse.json();

//     if (data.error) {
//       console.error(`Error deleting stripe customer detail: ${data.error.message}`);
//       return null;
//     }

//     console.log(`Deleted stripe customer detail: `, data.id);
//     return data.id;
//   }
// };

// serve(async req => {
//   if (req.method !== "POST") {
//     return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
//       status: 405,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   try {
//     const payload = await req.json();

//     console.log("Webhook received:", payload);

//     const { old_record: oldRecord } = payload;
//     const deletedCustomerId = await deleteStripeCustomer(oldRecord);

//     return new Response(JSON.stringify({ id: deletedCustomerId }), {
//       headers: { "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error.message);
//     return new Response(JSON.stringify({ error: error.message }), {
//       headers: { "Content-Type": "application/json" },
//       status: 400,
//     });
//   }
// });
