// app/(website)/p/[slug]/page.tsx
import PostPage from "./default";
// import { CommentsContextProvider } from '@/lib/supabase-comments/hooks/use-comments';
import {
  getAllPostsSlugs,
  getGlobalFields,
  getPodcastData,
  getPostBySlug,
  getPublicationPosts,
  getSettings,
} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Newsletters from "@/app/(website)/newsletters/newsletters";
import Footer from "@/components/footer";
import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription,
  getUserDetails,
  getPostIdBySlug,
} from "@/app/(website)/supabase-server";
import {urlForImage} from "@/lib/sanity/image";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({params}) {
  const pageData = await getPostBySlug(params.slug);
  const settings = await getSettings();
  const title = pageData.meta_title
    ? pageData.meta_title
    : pageData.title + " | Pirate Wires";
  const description = pageData.meta_description
    ? pageData.meta_description
    : pageData.excerpt;
  const image = pageData.openGraphImage
    ? urlForImage(pageData.openGraphImage)?.src
    : urlForImage(settings?.openGraphImage)?.src;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1200,
          height: 600,
        },
      ],
    },
  };
}

export default async function PostDefault({params}) {
  const post = await getPostBySlug(params.slug);
  const postId = await getPostIdBySlug(params.slug);
  if (!post.section) {
    // quick fix. if section is not available, make 'the-wire' as ddfault
    post.section = "the-wire";
  }
  const allRelatedArticles = await getPublicationPosts(post.section);
  const globalFields = await getGlobalFields();
  const publication = post.section;
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ]);
  return (
    <>
      <div
        className={`colorWrapper ${post.section}`}
        style={
          {
            "--color": "#060606",
            "--bgColor": "#E3E3E3",
            "--accentLight": "rgba(43, 43, 43, 0.45)",
          } as React.CSSProperties
        }>
        <Navigation publication={publication} />
        <PostPage
          post={post}
          postId={postId}
          userDetails={userDetails}
          thisSectionArticles={allRelatedArticles}
        />
        <Footer globalFields={globalFields} />
      </div>
    </>
  );
}

export const revalidate = 60;
