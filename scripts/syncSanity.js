require("dotenv").config({ path: "./.env.local" });

const { createClient: createSupabaseClient } = require("@supabase/supabase-js");
const { createClient: createSanityClient } = require("next-sanity");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-03-25";
const useCdn = process.env.NODE_ENV === "production";

const client = createSanityClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

const supabaseAdmin = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const createSupabasePost = async postData => {
  const { data, error } = await supabaseAdmin.from("posts").insert(postData);
  if (error) {
    console.error(`Error inserting post: ${error.message}`);
    return;
  }
  console.log(`Insert post successfully: ${postData.slug}`);
};

client
  .fetch('*[ _type == "post"]') // Adjust query based on your needs
  .then(data => {
    data.forEach(async item => {
      const postData = {
        sanity_id: item._id,
        slug: item.slug?.current,
        title: item.title,
        content: "content",
        parentId: null,
        isPublished: true,
        authorId: `bc4528f1-22f7-44a6-97c4-78bd54d33d11`,
      };
      //console.log(postData);
      await createSupabasePost(postData);
    });
  });
