import Home from "./home";

import {getHomeData} from "@/lib/sanity/client";

export default async function HomePage() {
   const pageData = await getHomeData("home")
   return <Home pageData={pageData[0]} />;
}

// export const revalidate = 60;
