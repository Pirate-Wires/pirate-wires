import Utility from "./utility";

import {
  getAllUtilityPageSlugs, getAuthorsData,
  getGlobalFields, getSettings, getUtilityPageData
} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {urlForImage} from "@/lib/sanity/image";

export async function generateStaticParams() {
  return await getAllUtilityPageSlugs();
}

export async function generateMetadata({ params }) {
  const pageData = await getUtilityPageData(params.utility);
  const settings = await getSettings();
  const title = pageData.meta_title ? pageData.meta_title : settings.meta_title
  const description = pageData.meta_description ? pageData.meta_description : settings.meta_description
  const image = pageData.openGraphImage ? urlForImage(pageData.openGraphImage)?.src : urlForImage(settings?.openGraphImage)?.src

  return { title: title, description: description, openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1200,
          height: 600,
        },
      ]
    }};
}

export default async function UtilityPage({ params }) {
  const pageData = await getUtilityPageData(params.utility);
  const globalFields = await getGlobalFields();

  return <div className="colorWrapper" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Utility pageData={pageData} />
    <Footer globalFields={globalFields} />
  </div>
}

// export const revalidate = 60;
