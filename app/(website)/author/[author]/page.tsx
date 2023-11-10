import Author from "./author";

import {
  getAllAuthorsSlugs,
  getAuthorData,
  getAuthorPosts,
  getGlobalFields
} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export async function generateStaticParams() {
  return await getAllAuthorsSlugs();
}

export async function generateMetadata({ params }) {
  const author = await getAuthorData(params.author);
  return { title: author.name + " - " + author.title + " | Pirate Wires" };
}

export default async function AuthorPage({ params }) {
  const posts = await getAuthorPosts(params.author);
  const authorData = await getAuthorData(params.author);
  const globalFields = await getGlobalFields();

  return <div className="colorWrapper author" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Author posts={posts} authorData={authorData} />
    <Footer globalFields={globalFields} />
  </div>
}

// export const revalidate = 60;
