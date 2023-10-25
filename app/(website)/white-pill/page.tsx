import WhitePill from "./white-pill";
import Link from "next/link";
import {getPublicationData} from "@/lib/sanity/client";

export default async function WhitePillPage() {
  const pageData = await getPublicationData("white-pill")
  return <WhitePill pageData={pageData[0]} />;
}
