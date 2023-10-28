import Wires from "./wires";
import {getGlobalFields, getPublicationData, getPublicationNewsletters, getPublicationPosts} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default async function WiresPage() {
  const pageData = await getPublicationData("wires")
  const globalFields = await getGlobalFields();
  const publicationPosts = await getPublicationPosts('the-wire')
  const publicationNewsletters = await getPublicationNewsletters('the-wire')
  return <div className="colorWrapper interiorPub pirate-wires" style={{
    "--color": "#E3E3E3",
    "--bgColor": "#060606",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Wires pageData={pageData[0]} publicationPosts={publicationPosts} publicationNewsletters={publicationNewsletters} />
    <Footer globalFields={globalFields} />
  </div>
}
