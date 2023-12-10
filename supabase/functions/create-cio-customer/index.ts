// import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// const CUSTOMER_IO_SITE_ID = Deno.env.get("CUSTOMER_IO_SITE_ID");
// const CUSTOMER_IO_API_KEY = Deno.env.get("CUSTOMER_IO_API_KEY");
// const CUSTOMER_IO_TRACKING_API_KEY = Deno.env.get("CUSTOMER_IO_TRACKING_API_KEY");

// const createCioCustomer = async record => {
//   const {
//     id,
//     email,
//     raw_user_meta_data: { full_name },
//   } = record;

//   const getResponse = await fetch(`https://api.customer.io/v1/customers/${id}/attributes?id_type=id`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${CUSTOMER_IO_API_KEY}`,
//     },
//   });

//   const cusotmerData = await getResponse.json();

//   console.log(cusotmerData);

//   if (!cusotmerData.errors) {
//     const {
//       customer: { attributes: oldCustomer },
//     } = cusotmerData;

//     if (oldCustomer.full_name === full_name && oldCustomer.email === email) {
//       console.error(`The cio customer already exists.`);
//       return;
//     }
//   }

//   await fetch(`https://track.customer.io/api/v1/customers/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Basic ${btoa(`${CUSTOMER_IO_SITE_ID}:${CUSTOMER_IO_TRACKING_API_KEY}`)}`,
//     },
//     body: JSON.stringify({
//       email,
//       full_name,
//     }),
//   });

//   console.log(`Created cio customer detail email: ${email}, name: ${full_name}`);
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

//     await createCioCustomer(record);

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
