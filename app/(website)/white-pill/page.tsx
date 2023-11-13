import WhitePill from "./white-pill";
import {
  getAuthorData,
  getGlobalFields,
  getPublicationData,
  getPublicationNewsletters,
  getPublicationPosts, getSettings
} from "@/lib/sanity/client";
import { getSession } from "@/app/(website)/supabase-server";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {urlForImage} from "@/lib/sanity/image";

export async function generateMetadata({ params }) {
  const pageData = await getPublicationData("white-pill")
  const settings = await getSettings();
  const title = pageData[0].meta_title ? pageData[0].meta_title : settings.meta_title
  const description = pageData[0].meta_description ? pageData[0].meta_description : settings.meta_description
  const image = pageData[0].openGraphImage ? urlForImage(pageData[0].openGraphImage)?.src : urlForImage(settings?.openGraphImage)?.src

  return { title: title, description: description, openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1200,
          height: 600,
        },
      ]
    }};
}
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
