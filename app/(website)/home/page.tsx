import Home from "./home";
import {
  getNewsletterData,
  getPublicationData,
  getSettings,
} from "@/lib/sanity/client";
import {getGlobalFields, getHomeData} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {urlForImage} from "@/lib/sanity/image";
export async function generateMetadata({params}) {
  const pageData = await getHomeData("home");
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
export default async function HomePage() {
  const pageData = await getHomeData("home");
  const globalFields = await getGlobalFields();
  const newsletterData = await getNewsletterData();
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
      <Home
        pageData={pageData[0]}
        globalFields={globalFields}
        newsletterData={newsletterData}
      />
      <Footer globalFields={globalFields} />
    </div>
  );
}

// export const revalidate = 60;
