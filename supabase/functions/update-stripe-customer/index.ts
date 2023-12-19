// import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
// const Authorization = `Bearer ${STRIPE_SECRET_KEY}`;

// const updateStripeCustomer = async (customerId, record) => {
//   const {
//     raw_user_meta_data: { full_name: name },
//     email,
//   } = record;

//   const getResponse = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization,
//     },
//   });
//   const oldCustomer = await getResponse.json();

//   if (oldCustomer.error) {
//     console.error(`Error fetching stripe customer detail: ${customerId}`);
//     return null;
//   }

//   if (oldCustomer.name === name && oldCustomer.email === email) {
//     console.error(`The stripe customer is already up to date`);
//     return null;
//   }

//   const updateResponse = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization,
//     },
//     body: new URLSearchParams({
//       name,
//       email,
//     }).toString(),
//   });

//   const data = await updateResponse.json();

//   if (data.error) {
//     console.error(`Error updating stripe customer detail: ${data.error.message}`);
//     return null;
//   }

//   console.log(`Updated stripe customer detail email: ${email}, name: ${name}`);
//   return data;
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

//     const { record, old_record: oldRecord } = payload;

//     if (
//       record.email === oldRecord.email &&
//       record.raw_user_meta_data.full_name === oldRecord.raw_user_meta_data.full_name
//     ) {
//       throw new Error("The user record hasn't changed");
//     }

//     const { data: customerData, error } = await supabaseAdmin
//       .from("users")
//       .select("stripe_customer_id")
//       .eq("id", oldRecord.id)
//       .single();

//     if (error) {
//       throw new Error("The customer was not found");
//     }

//     await updateStripeCustomer(customerData.stripe_customer_id, record);

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
