import WhitePill from "./white-pill";
import {getGlobalFields, getPublicationData, getPublicationNewsletters, getPublicationPosts} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default async function IndustryPage() {
  const pageData = await getPublicationData("the-industry")
  const globalFields = await getGlobalFields();
  const publicationPosts = await getPublicationPosts('the-white-pill')
  const publicationNewsletters = await getPublicationNewsletters('the-white-pill')
  return <div className="colorWrapper interiorPub" style={{
    "--color": globalFields.white_pill_color,
    "--bgColor": globalFields.white_pill_bgcolor,
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <WhitePill pageData={pageData[1]} publicationPosts={publicationPosts} publicationNewsletters={publicationNewsletters} />
    <Footer globalFields={globalFields} />
  </div>
}
