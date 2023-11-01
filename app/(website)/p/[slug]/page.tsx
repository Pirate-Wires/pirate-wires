
// app/(website)/p/[slug]/page.tsx
import PostPage from "./default";
// import { CommentsContextProvider } from '@/lib/supabase-comments/hooks/use-comments';
import { getAllPostsSlugs, getGlobalFields, getPostBySlug } from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Newsletters from "@/app/(website)/newsletters/newsletters";
import Footer from "@/components/footer";
import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription,
  getUserDetails
} from "@/app/(website)/supabase-server";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return { title: post.title };

}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  const globalFields = await getGlobalFields();
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);
  console.log(post)
  return (
    <>
      <div className="colorWrapper" style={{
        "--color": "#060606",
        "--bgColor": "#E3E3E3",
        "--accentLight": "rgba(43, 43, 43, 0.45)",
      } as React.CSSProperties}>
        <Navigation globalFields={globalFields} />
        <PostPage post={post} session={session} />
        <Footer globalFields={globalFields} />
      </div>
    </>)
}

export const revalidate = 60;
