import Industry from "./industry";
import {
  getGlobalFields,
  getPublicationData,
  getPublicationPosts,
  getPublicationNewsletters,
  getSettings
} from "@/lib/sanity/client";
import { getSession } from "@/app/(website)/supabase-server";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {urlForImage} from "@/lib/sanity/image";
export async function generateMetadata({ params }) {
  const pageData = await getPublicationData("the-industry")
  const settings = await getSettings();
  const title = pageData[1].meta_title ? pageData[1].meta_title : settings.meta_title
  const description = pageData[1].meta_description ? pageData[1].meta_description : settings.meta_description
  const image = pageData[1].openGraphImage ? urlForImage(pageData[1].openGraphImage).src : urlForImage(settings?.openGraphImage)?.src

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
  const pageData = await getPublicationData("the-industry")
  const globalFields = await getGlobalFields();
  const publicationPosts = await getPublicationPosts('the-industry')
  const publicationNewsletters = await getPublicationNewsletters('the-industry')
  const session = await getSession()
  const user = session?.user
  return <div className="colorWrapper interiorPub" style={{
    "--color": globalFields.industry_color,
    "--bgColor": globalFields.industry_bgcolor,
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Industry
      pageData={pageData[1]}
      publicationPosts={publicationPosts}
      publicationNewsletters={publicationNewsletters}
      user={user}
    />
    <Footer globalFields={globalFields} />
  </div>
}
