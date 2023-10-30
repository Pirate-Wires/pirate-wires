// app/(website)/authors/page.tsx
import {getAuthorsData, getGlobalFields} from "@/lib/sanity/client";
import Authors from "./authors";
import React from "react";
import Navigation from "@/components/navigation";
import Home from "@/app/(website)/home/home";
import Footer from "@/components/footer";

export default async function AuthorsPage() {
  const pageData = await getAuthorsData();
  const globalFields = await getGlobalFields();
  return <div className="colorWrapper" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
    "--accentLight": "rgba(43, 43, 43, 0.28)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Authors pageData={pageData} />
    <Footer globalFields={globalFields} />
  </div>
}

// export const revalidate = 60;
