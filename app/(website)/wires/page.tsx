import Wires from "./wires";
import {getGlobalFields, getPublicationData, getPublicationNewsletters, getPublicationPosts} from "@/lib/sanity/client";
import { getSession } from "@/app/(website)/supabase-server";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

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
