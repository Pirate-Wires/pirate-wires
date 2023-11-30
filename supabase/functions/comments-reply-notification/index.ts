// import {createClient} from "https://esm.sh/@supabase/supabase-js@2.7.1";
// import {serve} from "https://deno.land/std@0.168.0/http/server.ts";

// const CUSTOMER_IO_API_KEY = Deno.env.get("CUSTOMER_IO_API_KEY");

// const Authorization = `Bearer ${CUSTOMER_IO_API_KEY}`;
// const CIO_MESSAGE_ID = 2;

// const sendCommentReplyEmail = async (parentComment, rootPost) => {
//   const {title, slug} = rootPost;
//   const {
//     author: {email},
//   } = parentComment;

//   const res = await fetch("https://api.customer.io/v1/send/email", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization,
//     },
//     body: JSON.stringify({
//       transactional_message_id: `${CIO_MESSAGE_ID}`,
//       message_data: {
//         title,
//         slug,
//       },
//       identifiers: {
//         email,
//       },
//       to: email,
//     }),
//   });

//   const data = await res.json();

//   if (data.meta) {
//     console.log(`Error sending email to ${email}: ${data.meta.error}`);
//     return null;
//   }

//   console.log(`Sent comment reply notification email to ${email}: ${slug}`);
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

//     // Process payload
//     console.log("Webhook received:", payload);

//     const {record} = payload;

//     if (record.parentId === record.rootId) {
//       throw new Error("The user leave comment on the post");
//     }

//     const {data: parentComment, error: parentGetError} = await supabaseAdmin
//       .from("comments_thread_with_user_vote")
//       .select("slug, title, author")
//       .eq("id", record.parentId)
//       .single();

//     if (parentGetError) {
//       throw parentGetError;
//     }

//     const {data: rootPost, error: rootGetError} = await supabaseAdmin
//       .from("comments_thread_with_user_vote")
//       .select("slug, title, author")
//       .eq("id", record.rootId)
//       .single();

//     if (rootGetError) {
//       throw rootGetError;
//     }

//     await sendCommentReplyEmail(parentComment, rootPost);

//     return new Response(JSON.stringify({postTitle: rootPost.title}), {
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
