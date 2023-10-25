// app/(website)/authors/page.tsx
import {getAllAuthors, getGlobalFields} from "@/lib/sanity/client";
import Authors from "./authors";
import React from "react";
import Navigation from "@/components/navigation";
import Home from "@/app/(website)/home/home";
import Footer from "@/components/footer";

export default async function AuthorsPage() {
  const authors = await getAllAuthors(); // Fetch all authors from Sanity
  const globalFields = await getGlobalFields();
  return <div className="colorWrapper" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <Authors authors={authors} />
    <Footer globalFields={globalFields} />
  </div>
}

// export const revalidate = 60;
