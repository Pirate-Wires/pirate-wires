import Industry from "./industry";
import {getGlobalFields, getPublicationData} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Newsletters from "@/app/(website)/newsletters/newsletters";
import Footer from "@/components/footer";

export default async function IndustryPage() {
  const pageData = await getPublicationData("the-industry")
  const globalFields = await getGlobalFields();
  return <div className="colorWrapper" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Industry pageData={pageData[1]} />
    <Footer globalFields={globalFields} />
  </div>
}
