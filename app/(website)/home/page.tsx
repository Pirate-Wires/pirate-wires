import Home from "./home";

import {getAllPosts, getGlobalFields, getPostByID} from "@/lib/sanity/client";

export default async function HomePage() {
   const posts = await getAllPosts();
   const globalFields = await getGlobalFields();
   return <Home posts={posts} globalFields={globalFields} />;
}

// export const revalidate = 60;
