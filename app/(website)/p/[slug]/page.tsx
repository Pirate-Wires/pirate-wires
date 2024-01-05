// app/(website)/p/[slug]/page.tsx
import { headers } from "next/headers";
import React from "react";

import { getSession, getUserDetails, getViewedArticles, upsertViewedArticles } from "@/app/(website)/supabase-server";
import Newsletters from "@/app/(website)/newsletters/newsletters";
import PostPage from "./default";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

import styles from "@/styles/pages/article.module.scss";

import { urlForImage } from "@/lib/sanity/image";
import {
  getAllPostsSlugs,
  getGlobalFields,
  getPodcastData,
  getPostBySlug,
  getPublicationPosts,
  getSettings,
} from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const pageData = await getPostBySlug(params.slug);
  const settings = await getSettings();
  const title = pageData.meta_title ? pageData.meta_title : pageData.title ?? "Not Found" + " | Pirate Wires";
  const description = pageData.meta_description ? pageData.meta_description : pageData.excerpt;
  const image = pageData.openGraphImage
    ? urlForImage(pageData.openGraphImage)?.src
    : pageData.mainImage?.asset?.url ?? null;

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

export default async function PostDefault({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  let postId;
  if (post.slug) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/post`, {
        method: "POST",
        body: JSON.stringify({
          payload: {
            sanity_id: post._id,
            slug: post.slug?.current,
            title: post.title,
            content: "content",
            parentId: null,
            isPublished: true,
            authorId: `8d4ec9ff-d194-455b-bfb1-eb6f4640df4a`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      postId = data.id;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
  if (!post.section) {
    // quick fix. if section is not available, make 'the-wire' as ddfault
    post.section = "the-wire";
  }
  const allRelatedArticles = await getPublicationPosts(post.section);
  const globalFields = await getGlobalFields();
  const publication = post.section;
  const session = await getSession();
  const userDetails = await getUserDetails(session?.user.id!);
  let freeViewedArticleCount = 0;

  if (!session && post.slug) {
    const header = headers();
    const ipAddress = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

    const viewedArticles = await getViewedArticles(ipAddress);
    freeViewedArticleCount = viewedArticles.length;

    if (viewedArticles.length < 3 && !viewedArticles.find(article => article.slug === post.slug.current)) {
      await upsertViewedArticles(ipAddress, [
        ...viewedArticles,
        { slug: post.slug.current, viewed_at: new Date().toString() },
      ]);
      freeViewedArticleCount++;
    }
  }

  return (
    <>
      <div
        className={`colorWrapper article ${freeViewedArticleCount === 3 ? styles.articleRestricted : ""} ${
          post.section
        }`}
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
          freeViewedArticleCount={freeViewedArticleCount}
        />
        <Footer globalFields={globalFields} />
      </div>
    </>
  );
}

export const revalidate = 60;
