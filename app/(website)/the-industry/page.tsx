import Industry from "./industry";
import {getPublicationData} from "@/lib/sanity/client";

export default async function IndustryPage() {
  const pageData = await getPublicationData("the-industry")
  return <Industry pageData={pageData[1]} />;
}
