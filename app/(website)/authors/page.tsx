// app/(website)/authors/page.tsx
import { getAuthorsData, getCareersData, getGlobalFields, getSettings } from "@/lib/sanity/client";
import Authors from "./authors";
import React from "react";
import Navigation from "@/components/navigation";
import Home from "@/app/(website)/home/home";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
export async function generateMetadata() {
  const pageData = await getAuthorsData();
  const settings = await getSettings();
  const title = pageData.meta_title ? pageData.meta_title : settings.meta_title;
  const description = pageData.meta_description ? pageData.meta_description : settings.meta_description;
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
export default async function AuthorsPage() {
  const pageData = await getAuthorsData();
  const globalFields = await getGlobalFields();
  return (
    <div
      className="colorWrapper"
      style={
        {
          "--color": "#060606",
          "--bgColor": "#E3E3E3",
          "--accentLight": "rgba(43, 43, 43, 0.45)",
        } as React.CSSProperties
      }>
      <Navigation globalFields={globalFields} />
      <Authors pageData={pageData} />
      <Footer globalFields={globalFields} />
    </div>
  );
}

// export const revalidate = 60;
