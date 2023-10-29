import Author from "./author";

import {getAllAuthorsSlugs, getAuthorPostsBySlug, getAuthorsData, getGlobalFields} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Authors from "@/app/(website)/authors/authors";
import Footer from "@/components/footer";
import {useHoverArrow} from "@/hooks/useHoverArrow";

export async function generateStaticParams() {
  return await getAllAuthorsSlugs();
}

async function getAuthor(slug: string) {
  const posts = await getAuthorPostsBySlug(slug);
  return posts?.[0]?.author || {};
}

export async function generateMetadata({ params }) {
  const author = await getAuthor(params.author);
  return { title: author.title };
}

export default async function AuthorPage({ params }) {
  const posts = await getAuthorPostsBySlug(params.author);
  const author = await getAuthor(params.author);
  const globalFields = await getGlobalFields();

  return <div className="colorWrapper" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Author posts={posts} author={author} />
    <Footer globalFields={globalFields} />
  </div>
}

// export const revalidate = 60;
