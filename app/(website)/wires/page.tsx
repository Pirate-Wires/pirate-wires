import Wires from "./wires";
import {
  getGlobalFields,
  getPublicationData,
  getPublicationNewsletters,
  getPublicationPosts,
  getSettings
} from "@/lib/sanity/client";
import { getSession } from "@/app/(website)/supabase-server";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {urlForImage} from "@/lib/sanity/image";
export async function generateMetadata({ params }) {
  const pageData = await getPublicationData("wires")
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
export default async function WiresPage() {
  const pageData = await getPublicationData("wires")
  const globalFields = await getGlobalFields();
  const publicationPosts = await getPublicationPosts('the-wire')
  const publicationNewsletters = await getPublicationNewsletters('the-wire')
  const session = await getSession();
  const user = session?.user;
  return <div className="colorWrapper interiorPub pirate-wires" style={{
    "--color": "#E3E3E3",
    "--bgColor": "#060606",
    "--accentLight": "rgba(227, 227, 227, 0.45)"
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Wires
      pageData={pageData[0]}
      publicationPosts={publicationPosts}
      publicationNewsletters={publicationNewsletters}
      user={user}
    />
    <Footer globalFields={globalFields} />
  </div>
}
