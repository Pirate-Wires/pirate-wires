import Wires from "./wires";
import Link from "next/link";
import {getGlobalFields, getPublicationData} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default async function WiresPage() {
  const pageData = await getPublicationData("wires")
  const globalFields = await getGlobalFields();
  return <div className="colorWrapper" style={{
    "--color": "#E3E3E3",
    "--bgColor": "#060606",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Wires pageData={pageData[0]} />
    <Footer globalFields={globalFields} />
  </div>
}
