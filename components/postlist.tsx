import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import {useDateFormatter} from "@/hooks/useDateFormatter";

export default function PostList({
  post,
  pathPrefix,
}) {
  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  // Extract the image color
  const imageColor = post?.mainImage?.ImageColor || "black";

  // Create a CSS radial gradient string using the extracted color
  const radialGradient = `radial-gradient(ellipse at center, ${imageColor}, transparent)`;

  return (
    <article className="hasGoIcon mtb-20">
      <Link
        href={`/p/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug ? post.slug.current : ""}`}>
        {imageProps && (
          <div className="imgWrapper" style={{
            background: radialGradient // Use the radial gradient as the background
          }}>
            <Image
              src={imageProps.src}
              {...(post.mainImage.blurDataURL && {
                placeholder: "blur",
                blurDataURL: post.mainImage.blurDataURL
              })}
              alt={post.mainImage?.alt || "Thumbnail"}
              priority
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        <h1
          className="postTitle">
          {post.title}
          <div className="goIcon">
            <div className="leftHalf"></div>
            <div className="rightHalf"></div>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
            </svg>
            <span className="date">
              {useDateFormatter(post?.publishedAt || post._createdAt)}
            </span>
          </div>
        </h1>

        <p className="excerpt caslon-reg">
          {post.excerpt}
        </p>

        <Link
          href={`/author/${post?.author?.slug?.current}`} className="postAuthor">
          {post?.author?.name}
        </Link>
      </Link>
    </article>
  );
}
