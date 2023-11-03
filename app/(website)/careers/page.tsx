import Careers from "./careers";
import {getCareersData, getGlobalFields} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Authors from "@/app/(website)/authors/authors";
import Footer from "@/components/footer";

export default async function CareersPage() {
  const pageData = await getCareersData()
  const globalFields = await getGlobalFields();
  return <div className="colorWrapper" style={{
    "--color": "#E3E3E3",
    "--bgColor": "#060606",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Careers pageData={pageData} />
    <Footer globalFields={globalFields} />
  </div>
}
