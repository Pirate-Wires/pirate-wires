// import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// const CUSTOMER_IO_SITE_ID = Deno.env.get("CUSTOMER_IO_SITE_ID");
// const CUSTOMER_IO_API_KEY = Deno.env.get("CUSTOMER_IO_API_KEY");
// const CUSTOMER_IO_TRACKING_API_KEY = Deno.env.get("CUSTOMER_IO_TRACKING_API_KEY");

// const updateCioCustomer = async (record, oldRecord) => {
//   const {
//     raw_user_meta_data: { full_name: newName },
//     email: newEmail,
//   } = record;
//   const { id } = oldRecord;

//   const getResponse = await fetch(`https://api.customer.io/v1/customers/${id}/attributes?id_type=id`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${CUSTOMER_IO_API_KEY}`,
//     },
//   });
//   const cusotmerData = await getResponse.json();

//   if (cusotmerData.errors) {
//     console.error(`Error fetching cio customer detail: ${cusotmerData.errors.detail}`);
//     return null;
//   }

//   const {
//     customer: {
//       attributes: oldCustomer,
//       identifiers: { cio_id: customerId },
//     },
//   } = cusotmerData;

//   if (oldCustomer.full_name === newName && oldCustomer.email === newEmail) {
//     console.error(`The cio customer is already up to date`);
//     return null;
//   }

//   await fetch(`https://track.customer.io/api/v1/customers/cio_${customerId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Basic ${btoa(`${CUSTOMER_IO_SITE_ID}:${CUSTOMER_IO_TRACKING_API_KEY}`)}`,
//     },
//     body: JSON.stringify({
//       email: newEmail,
//       full_name: newName,
//     }),
//   });

//   console.log(`Updated stripe customer detail email: ${newEmail}, name: ${newName}`);
//   return { ...oldCustomer, attributes: { full_name: newName, email: newEmail }, identifiers: { email: newEmail } };
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

//     await updateCioCustomer(record, oldRecord);

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
