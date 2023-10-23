import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import AuthorCard from "@/components/blog/authorCard";
import {useDateFormatter} from "@/hooks/useDateFormatter";
export default function Post(props) {
  const { loading, post } = props;

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }

  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  return (
    <>
      <Container className="!p-0">
        <div className="mx-auto mt-10 max-w-screen-md px-5 ">
          <h1 className="text-brand-primary mb-3 mt-2 text-3xl font-semibold tracking-tight dark:text-white lg:text-5xl lg:leading-tight">
            {post.title}
          </h1>

          <div className="mt-8 flex space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div className="relative h-5 w-5 flex-shrink-0">
                {AuthorimageProps && (
                  <Link href={`/author/${post.author.slug.current}`}>
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="100vw"
                    />
                  </Link>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2 text-sm">
                  <p className="text-gray-800 dark:text-gray-400">
                    <Link
                      href={`/author/${post.author.slug.current}`}>
                      {post.author.name}
                    </Link>
                    ·
                  </p>
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post?.publishedAt || post._createdAt}>
                    {useDateFormatter(post?.publishedAt || post._createdAt)}
                  </time>
                  <span>· {post.estReadingTime || "5"} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* {post?.mainImage && <MainImage image={post.mainImage} />} */}
      <Container>
        <article className="mx-auto max-w-screen-md ">
          <div className="prose lg:prose-xl mx-auto my-3 dark:prose-invert leading-normal prose-a:text-gray-600 visited:text-gray-400 font-serif">
            {post.body && <PortableText value={post.body} />}
          </div>
          {post.author && <AuthorCard author={post.author} />}
        </article>
      </Container>
    </>
  );
}

const MainImage = ({ image }) => {
  return (
    <div className="mb-12 mt-12 ">
      {/* @ts-ignore */}
      <Image {...urlForImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};
