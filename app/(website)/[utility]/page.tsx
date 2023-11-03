import Utility from "./utility";

import {
  getAllUtilityPageSlugs,
  getGlobalFields, getUtilityPageData
} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export async function generateStaticParams() {
  return await getAllUtilityPageSlugs();
}

export async function generateMetadata({ params }) {

  // return { title: author.name + " - " + author.title };
}

export default async function UtilityPage({ params }) {
  console.log(params)
  const pageData = await getUtilityPageData(params.utility);
  const globalFields = await getGlobalFields();

  return <div className="colorWrapper author" style={{
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
