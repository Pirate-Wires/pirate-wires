import Author from "./author";

import {
  getAllAuthorsSlugs,
  getAuthorData,
  getAuthorPosts,
  getGlobalFields,
  getSettings,
} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {urlForImage} from "@/lib/sanity/image";

export async function generateStaticParams() {
  return await getAllAuthorsSlugs();
}

export async function generateMetadata({params}) {
  const author = await getAuthorData(params.author);
  const settings = await getSettings();
  const title = author.meta_title
    ? author.meta_title
    : author.name + " - " + author.title + " | Pirate Wires";
  const description = author.meta_description
    ? author.meta_description
    : settings.meta_description;
  const image = author.openGraphImage
    ? urlForImage(author.openGraphImage)?.src
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

export default async function AuthorPage({params}) {
  const posts = await getAuthorPosts(params.author);
  const authorData = await getAuthorData(params.author);
  const globalFields = await getGlobalFields();

  return (
    <div
      className="colorWrapper author"
      style={
        {
          "--color": "#060606",
          "--bgColor": "#E3E3E3",
          "--accentLight": "rgba(43, 43, 43, 0.45)",
        } as React.CSSProperties
      }>
      <Navigation globalFields={globalFields} />
      <Author posts={posts} authorData={authorData} />
      <Footer globalFields={globalFields} />
    </div>
  );
}

// export const revalidate = 60;
