import Industry from "./industry";
import {getGlobalFields, getPublicationData, getPublicationPosts, getPublicationNewsletters} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default async function IndustryPage() {
  const pageData = await getPublicationData("the-industry")
  const globalFields = await getGlobalFields();
  const publicationPosts = await getPublicationPosts('the-industry')
  const publicationNewsletters = await getPublicationNewsletters('the-industry')
  return <div className="colorWrapper interiorPub" style={{
    "--color": globalFields.industry_color,
    "--bgColor": globalFields.industry_bgcolor,
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Industry pageData={pageData[1]} publicationPosts={publicationPosts} publicationNewsletters={publicationNewsletters} />
    <Footer globalFields={globalFields} />
  </div>
}
