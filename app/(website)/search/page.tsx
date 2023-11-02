import Search from "./search";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {getAllPosts, getGlobalFields} from "@/lib/sanity/client";

export default async function SearchPage() {
  const globalFields = await getGlobalFields();
  const allPosts = await getAllPosts()
  return <div className="colorWrapper author" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Search posts={allPosts} />
    <Footer globalFields={globalFields} />
  </div>
}

// export const revalidate = 60;
