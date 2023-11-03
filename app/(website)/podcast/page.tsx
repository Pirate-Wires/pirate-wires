// app/(website)/podcasts/page.tsx
import {getGlobalFields, getPodcastData} from "@/lib/sanity/client";
import Podcasts from "./podcasts";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default async function PodcastPage() {
  const pageData = await getPodcastData();
  const globalFields = await getGlobalFields();
  return <div className="colorWrapper" style={{
    "--color": "#E3E3E3",
    "--bgColor": "#060606",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Podcasts pageData={pageData} />;
    <Footer globalFields={globalFields} />
  </div>
}
