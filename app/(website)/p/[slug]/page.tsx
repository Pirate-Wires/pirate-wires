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
import { getSession, getUserDetails } from "@/app/(website)/supabase-server";
import { urlForImage } from "@/lib/sanity/image";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const pageData = await getPostBySlug(params.slug);
  const settings = await getSettings();
  const title = pageData.meta_title ? pageData.meta_title : pageData.title + " | Pirate Wires";
  const description = pageData.meta_description ? pageData.meta_description : pageData.excerpt;
  const image = pageData.openGraphImage ? urlForImage(pageData.openGraphImage)?.src : pageData.mainImage.asset.url;

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
  if (post) {
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
            authorId: `bc4528f1-22f7-44a6-97c4-78bd54d33d11`,
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

  return (
    <>
      <div
        className={`colorWrapper article ${post.section}`}
        style={
          {
            "--color": "#060606",
            "--bgColor": "#E3E3E3",
            "--accentLight": "rgba(43, 43, 43, 0.45)",
          } as React.CSSProperties
        }>
        <Navigation publication={publication} />
        <PostPage post={post} postId={postId} userDetails={userDetails} thisSectionArticles={allRelatedArticles} />
        <Footer globalFields={globalFields} />
      </div>
    </>
  );
}

export const revalidate = 60;
