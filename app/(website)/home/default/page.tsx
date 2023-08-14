import DefaultHome from "./default";

import { getAllPosts } from "@/lib/sanity/client";

export default async function DefaultHomePage() {
   const posts = await getAllPosts();
   return <DefaultHome posts={posts} />;
}

// export const revalidate = 60;
