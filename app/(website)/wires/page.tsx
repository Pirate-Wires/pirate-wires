import Wires from "./wires";
import Link from "next/link";
import {getPublicationData} from "@/lib/sanity/client";

export default async function WiresPage() {
  const pageData = await getPublicationData("wires")
  return <Wires pageData={pageData[0]} />;
}
