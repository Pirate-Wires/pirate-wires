// import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
// const Authorization = `Bearer ${STRIPE_SECRET_KEY}`;

// const createOrUpdateStripeCustomer = async record => {
//   const {
//     raw_user_meta_data: { full_name },
//     email,
//   } = record;
//   const name = full_name ?? "";

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
//     const { id: customerId, name: customerName } = customer;

//     if (customerName === name) {
//       console.error(`The stripe customer already exists`);
//       return null;
//     }

//     const updateResponse = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization,
//       },
//       body: new URLSearchParams({
//         name,
//       }).toString(),
//     });

//     const data = await updateResponse.json();

//     if (data.error) {
//       console.error(`Error updating stripe customer detail: ${data.error.message}`);
//       return null;
//     }

//     console.log(`Updated stripe customer detail email: ${email}, name: ${name}`);
//     return data;
//   } else {
//     const createResponse = await fetch(`https://api.stripe.com/v1/customers`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization,
//       },
//       body: new URLSearchParams({
//         email,
//         name,
//       }).toString(),
//     });

//     const data = await createResponse.json();

//     if (data.error) {
//       console.error(`Error updating stripe customer detail: ${data.error.message}`);
//       return null;
//     }

//     console.log(`Created stripe customer detail email: ${email}, name: ${name}`);
//     return data;
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
//     // Create a Supabase client with the Auth context of the logged in user.
//     const supabaseAdmin = createClient(
//       // Supabase API URL - env var exported by default.
//       Deno.env.get("SUPABASE_URL") ?? "",
//       // Supabase API ANON KEY - env var exported by default.
//       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
//       // Create client with Auth context of the user that called the function.
//       // This way your row-level-security (RLS) policies are applied.
//       // {
//       //   global: {
//       //     headers: { Authorization: req.headers.get('Authorization')! },
//       //   },
//       // }
//     );

//     const payload = await req.json();

//     console.log("Webhook received:", payload);

//     const { record } = payload;

//     const { id: stripeCustomerId } = await createOrUpdateStripeCustomer(record);

//     const { data, error } = await supabaseAdmin
//       .from("customers")
//       .insert({ id: record.id, stripe_customer_id: stripeCustomerId })
//       .select();

//     if (error) {
//       throw error;
//     }

//     console.log("Insert the customer record: ", data[0]);

//     return new Response(JSON.stringify({ newEmail: record.email }), {
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
