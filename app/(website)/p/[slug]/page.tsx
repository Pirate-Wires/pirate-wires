
// app/(website)/p/[slug]/page.tsx
import PostPage from "./default";
import { CommentsContextProvider } from '@/lib/supabase-comments/hooks/use-comments';
import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return { title: post.title };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  console.log('post', post);
  // console.log(post._id); // Make sure you see the id here
  return (
    <>
      <CommentsContextProvider postId={post._id}>
        <PostPage post={post} />
      </CommentsContextProvider>
    </>
  );
}

export const revalidate = 60;
