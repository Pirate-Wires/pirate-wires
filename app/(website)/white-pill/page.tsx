import WhitePill from "./white-pill";
import Link from "next/link";
import {getGlobalFields, getPublicationData} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Industry from "@/app/(website)/the-industry/industry";
import Footer from "@/components/footer";

export default async function WhitePillPage() {
  const pageData = await getPublicationData("white-pill")
  const globalFields = await getGlobalFields();
  return <div className="colorWrapper" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <WhitePill pageData={pageData[0]} />
    <Footer globalFields={globalFields} />
  </div>
}
