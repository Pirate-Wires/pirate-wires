import PodcastPage from "./podcast";


import { getAllPosts } from "@/lib/sanity/client";

export default async function PodcastPage() {
  const posts = await getAllPosts();
  return <PodcastPage posts={posts} />;
}

// export const revalidate = 60;
