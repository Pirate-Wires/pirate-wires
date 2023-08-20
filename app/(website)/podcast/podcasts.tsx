"use client"
import Container from "@/components/container";
import PodcastCard from "@/components/podcast-card";

export default function Podcasts({ podcasts }) {
  return (
    <Container>
      <div className="">
        <div className="">
          {podcasts.map((podcast) => (
            <PodcastCard key={podcast.slug} podcast={podcast} aspect={undefined} minimal={undefined} pathPrefix={undefined} preloadImage={undefined} fontSize={undefined} fontWeight={undefined} />
          ))}
        </div>
      </div>
    </Container>
  );
}
