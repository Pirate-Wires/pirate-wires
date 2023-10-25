import Home from "./home";

import {getGlobalFields, getHomeData} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default async function HomePage() {
   const pageData = await getHomeData("home")
   const globalFields = await getGlobalFields();
   return <div className="colorWrapper" style={{
        "--color": "#E3E3E3",
        "--bgColor": "#060606",
     } as React.CSSProperties}>
      <Navigation globalFields={globalFields} />
      <Home pageData={pageData[0]} />
      <Footer globalFields={globalFields} />
   </div>
   ;
}

// export const revalidate = 60;
