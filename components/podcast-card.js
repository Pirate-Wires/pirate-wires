import Image from "next/image";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import Link from "next/link";

export default function PodcastCard({ podcast }) {
  const imageProps = podcast?.image ? urlForImage(podcast.image) : null;
  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
        <div className="relative mt-1 h-24 w-24 flex-shrink-0 ">
          {imageProps && (
            <Link href={`/podcast/${podcast.slug.current}`}>
              <Image
                src={imageProps.src}
                alt={podcast.name}
                className="rounded-full object-cover"
                fill
                sizes="96px"
              />
            </Link>
          )}
        </div>
        <div>
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
              {podcast.title}
            </h3>
            <p>{podcast.excerpt}</p>
          </div>
          <div>
            {podcast.bio && <PortableText value={podcast.bio} />}
          </div>
          <div className="mt-3">
            <Link
              href={`/podcast/${podcast.slug.current}`}
              className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-500 dark:text-blue-500 ">
              View Podcast
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
