import WhitePill from "./white-pill";
import {getGlobalFields, getPublicationData, getPublicationNewsletters, getPublicationPosts} from "@/lib/sanity/client";
import { getSession } from "@/app/(website)/supabase-server";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default async function IndustryPage() {
  const pageData = await getPublicationData("white-pill")
  const globalFields = await getGlobalFields();
  const publicationPosts = await getPublicationPosts('the-white-pill')
  const publicationNewsletters = await getPublicationNewsletters('the-white-pill')
  const session = await getSession();
  const user = session?.user;
  return <div className="colorWrapper interiorPub" style={{
    "--color": globalFields.white_pill_color,
    "--bgColor": globalFields.white_pill_bgcolor,
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <WhitePill
      pageData={pageData[0]}
      publicationPosts={publicationPosts}
      publicationNewsletters={publicationNewsletters}
      user={user}
    />
    <Footer globalFields={globalFields} />
  </div>
}
