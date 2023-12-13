// import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

// const CUSTOMER_IO_SITE_ID = Deno.env.get("CUSTOMER_IO_SITE_ID");
// const CUSTOMER_IO_API_KEY = Deno.env.get("CUSTOMER_IO_API_KEY");
// const CUSTOMER_IO_TRACKING_API_KEY = Deno.env.get("CUSTOMER_IO_TRACKING_API_KEY");

// const deleteCioCustomer = async record => {
//   const { id } = record;

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
//       identifiers: { cio_id: customerId },
//     },
//   } = cusotmerData;

//   await fetch(`https://track.customer.io/api/v1/customers/cio_${customerId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Basic ${btoa(`${CUSTOMER_IO_SITE_ID}:${CUSTOMER_IO_TRACKING_API_KEY}`)}`,
//     },
//   });

//   console.log(`Deleted cio customer: `, customerId);
//   return customerId;
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

//     const deletedCustomerId = await deleteCioCustomer(oldRecord);

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
