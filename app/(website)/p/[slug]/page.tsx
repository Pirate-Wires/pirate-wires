// app/(website)/p/[slug]/page.tsx
import PostPage from "./default";
// import { CommentsContextProvider } from '@/lib/supabase-comments/hooks/use-comments';
import { getAllPostsSlugs, getGlobalFields, getPostBySlug, getPublicationPosts } from "@/lib/sanity/client";
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
  if (!post.section) {
    // quick fix. if section is not available, make 'the-wire' as ddfault
    post.section = 'the-wire';
  }
  const allRelatedArticles = await getPublicationPosts(post.section)
  const globalFields = await getGlobalFields();
  const publication = post.section
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);
  return (
    <>
      <div className={`colorWrapper ${post.section}`} style={{
        "--color": "#060606",
        "--bgColor": "#E3E3E3",
        "--accentLight": "rgba(43, 43, 43, 0.45)",
      } as React.CSSProperties}>
        <Navigation publication={publication} />
        <PostPage post={post} session={session} thisSectionArticles={allRelatedArticles} />
        <Footer globalFields={globalFields} />
      </div>
    </>)
}

export const revalidate = 60;
