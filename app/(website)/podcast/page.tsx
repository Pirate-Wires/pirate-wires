// app/(website)/podcasts/page.tsx
import {getPodcastData} from "@/lib/sanity/client";
import Podcasts from "./podcasts";

export default async function PodcastPage() {
  const pageData = await getPodcastData(); // Fetch all podcasts from Sanity
  console.log(pageData)
  return <Podcasts podcasts={pageData} />; // Pass podcasts to podcasts component
}
