// app/(website)/podcasts/page.tsx
import { getGlobalFields, getPodcastData, getPublicationData, getSettings } from "@/lib/sanity/client";
import Podcasts from "./podcasts";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
export async function generateMetadata({ params }) {
  const pageData = await getPodcastData();
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
export default async function PodcastPage() {
  const pageData = await getPodcastData();
  const globalFields = await getGlobalFields();
  return (
    <div
      className="colorWrapper"
      style={
        {
          "--color": "#E3E3E3",
          "--bgColor": "#060606",
        } as React.CSSProperties
      }>
      <Navigation globalFields={globalFields} />
      <Podcasts pageData={pageData} />;
      <Footer globalFields={globalFields} />
    </div>
  );
}
