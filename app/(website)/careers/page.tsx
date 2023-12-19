import Careers from "./careers";
import { getCareersData, getGlobalFields, getHomeData, getSettings } from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Authors from "@/app/(website)/authors/authors";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
export async function generateMetadata({ params }) {
  const pageData = await getCareersData();
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
export default async function CareersPage() {
  const pageData = await getCareersData();
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
      <Careers pageData={pageData} />
      <Footer globalFields={globalFields} />
    </div>
  );
}
