"use client";
import Link from "next/link";
import { useDateFormatter } from "@/lib/hooks/useDateFormatter";
import { useState } from "react";

import { Post } from "@/types";

interface PostListProps {
  post: Post;
  pathPrefix?: string;
  aspect?: string;
  preloadImage?: boolean;
}

const PostList: React.FC<PostListProps> = ({ post, pathPrefix, aspect, preloadImage }) => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 250);
  };

  const dateToDisplay = post.publishedAt;
  const formattedDate = dateToDisplay ? new Date(dateToDisplay) : null;
  const formattedDateString = useDateFormatter(formattedDate || new Date());

  return (
    <article className="hasGoIcon mtb-20">
      <Link href={`/p/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug ? post.slug.current : ""}`}>
        <div className="imgWrapper">
          {post.mainImage && post.mainImage.asset && (
            <>
              {!loaded && (
                <img
                  src={post.mainImage.blurDataURL}
                  alt={post.mainImage.alt}
                  decoding="async"
                  loading="lazy"
                  className="cover-image"
                />
              )}
              <picture>
                <source
                  srcSet={`${post.mainImage.asset.url}?auto=format&w=600&q=90, ${post.mainImage.asset.url}?auto=format&w=800&q=90 2x`}
                  media="(min-width: 768px)"
                />
                <source srcSet={`${post.mainImage.asset.url}?auto=format&w=400&q=100`} media="(max-width: 767px)" />
                <img alt="" decoding="async" loading="lazy" className="cover-image" onLoad={onLoad} />
              </picture>
            </>
          )}
        </div>
        <h1 className="postTitle">
          {post.title}
          <div className="goIcon">
            <div className="leftHalf"></div>
            <div className="rightHalf"></div>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z" />
            </svg>

            {/* Using formattedDateString */}
            {/* <span className="date">
              {useDateFormatter(post?.publishedAt || post._createdAt)}
            </span> */}

            <span className="date">{formattedDateString}</span>
          </div>
        </h1>

        <p className="excerpt martina-light">
          <svg preserveAspectRatio="none" viewBox="0 0 400 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              vectorEffect="non-scaling-stroke"
              y1="0.65"
              x2="400"
              y2="0.65"
              stroke="var(--color)"
              strokeOpacity="0.5"
              strokeWidth="0.7"
              strokeDasharray="5 5"
            />
          </svg>
          <span>{post.excerpt}</span>
        </p>
      </Link>
      <Link href={`/author/${post?.author?.slug?.current}`} className="postAuthor">
        {post?.author?.name}
      </Link>
    </article>
  );
};

export default PostList;
