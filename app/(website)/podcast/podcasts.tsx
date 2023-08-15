// app/(website)/podcasts.tsx
"use client"
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
// app/(website)/authorsauthors.tsx
import PodcastCard from "@/components/podcast-card";

export default function Podcasts({ podcasts }) {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.slug} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
