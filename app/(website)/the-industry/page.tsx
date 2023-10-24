import Industry from "./industry";
import {getHomeData, getPublicationData} from "@/lib/sanity/client";

export default async function IndustryPage() {
  const pageData = await getPublicationData("the-industry")
  return <Industry pageData={pageData[0]} />;
}
