import DefaultHomePage from "./home/default/page";
import { getAllPosts } from "@/lib/sanity/client";

export default async function IndexPage() {
  const posts = await getAllPosts();
  return <DefaultHomePage posts={posts} />;
}

// export const revalidate = 60;
