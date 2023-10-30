import Newsletters from "./newsletters";
import {getGlobalFields, getNewsletterData} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Home from "@/app/(website)/home/home";
import Footer from "@/components/footer";

export default async function NewslettersPage() {
  const pageData = await getNewsletterData()
  const globalFields = await getGlobalFields();
  return <div className="colorWrapper" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Newsletters pageData={pageData} />
    <Footer globalFields={globalFields} />
  </div>
}
