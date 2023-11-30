import Newsletters from "./newsletters";
import {
  getCareersData,
  getGlobalFields,
  getNewsletterData,
  getSettings,
} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Home from "@/app/(website)/home/home";
import Footer from "@/components/footer";
import {urlForImage} from "@/lib/sanity/image";
export async function generateMetadata({params}) {
  const pageData = await getNewsletterData();
  const settings = await getSettings();
  const title = pageData[0].meta_title
    ? pageData[0].meta_title
    : settings.meta_title;
  const description = pageData[0].meta_description
    ? pageData[0].meta_description
    : settings.meta_description;
  const image = pageData[0].openGraphImage
    ? urlForImage(pageData[0].openGraphImage)?.src
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
export default async function NewslettersPage() {
  const pageData = await getNewsletterData();
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
      <Newsletters pageData={pageData[0]} globalFields={globalFields} />
      <Footer globalFields={globalFields} />
    </div>
  );
}
