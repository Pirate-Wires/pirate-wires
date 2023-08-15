// app/(website)/podcasts/page.tsx
import { getAllPodcasts } from "@/lib/sanity/client";
import Podcasts from "./podcasts";

export default async function PodcastPage() {
  const podcasts = await getAllPodcasts(); // Fetch all podcasts from Sanity

  return <Podcasts podcasts={podcasts} />; // Pass podcasts to podcasts component
}
