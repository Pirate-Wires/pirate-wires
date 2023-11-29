// /app/(website)/p/[slug]/default.tsx
"use client";
import Link from "next/link";
import {notFound} from "next/navigation";
import {PortableText} from "@/lib/sanity/plugins/portabletext";
import {useDateFormatter} from "@/hooks/useDateFormatter";
import styles from "@/styles/pages/article.module.scss";
import articleCountStyles from "@/components/_styles/articleCountEls.module.scss";
import React, {useState} from "react";
import RelatedArticles from "@/components/relatedArticles";
import RemainingArticleEls from "@/components/remainingArticleEls";
import {useScrollBasedAnims} from "@/hooks/useScrollBasedAnims";
import Comment from "@/components/comment";

export default function Post(props) {
  const {loading, post, postId, thisSectionArticles, userDetails} = props;

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }

  const formattedDate = useDateFormatter(
    post?.publishedAt || post._createdAt,
    true,
  );

  let relatedArticles = post.related_posts;
  if (!relatedArticles) {
    relatedArticles = [];
    for (let i = 0; i < 4; i++) {
      if (
        relatedArticles.length < 3 &&
        thisSectionArticles[i].title !== post.title
      ) {
        relatedArticles.push(thisSectionArticles[i]);
      }
    }
  }

  useScrollBasedAnims();
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 250);
  };
  return (
    <>
      <section
        className={`${styles.articleHero} ${
          post.wide_image_top ? styles.wideImageTop : ""
        } ${post.wide_image_top ? "c-20" : ""}`}>
        {!post.wide_image_top ? (
          <>
            <div className={`${styles.imageWrapper} imageWrapper`}>
              {!loaded && (
                <img
                  src={post?.mainImage.blurDataURL}
                  alt=""
                  decoding="async"
                  loading="lazy"
                  className="cover-image"
                />
              )}
              <img
                src={post?.mainImage.blurDataURL}
                alt=""
                decoding="async"
                loading="lazy"
                className="cover-image"
              />
              <picture>
                <source
                  srcSet={`${post?.mainImage.asset.url}?auto=format&w=600&q=90, ${post?.mainImage.asset.url}?auto=format&w=1400&q=90 2x`}
                  media="(min-width: 768px)"
                />
                <source
                  srcSet={`${post?.mainImage.asset.url}?auto=format&w=550&q=100`}
                  media="(max-width: 767px)"
                />
                <img
                  alt=""
                  decoding="async"
                  loading="lazy"
                  className="cover-image"
                  onLoad={onLoad}
                />
              </picture>
              <figcaption className={`imageCaption`}>
                {post?.mainImage.caption && (
                  <span>{post?.mainImage.caption}</span>
                )}
              </figcaption>
            </div>
            <div className={styles.right}>
              <h1>{post.title}</h1>
              <div className={styles.excerpt}>{post.excerpt}</div>
              <div className={styles.bottom}>
                <Link href={`/author/${post.author.slug.current}`}>
                  {post.author.name}
                </Link>
                <p>{formattedDate}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.top}`}>
              <h1>{post.title}</h1>
              <div className={styles.excerpt}>{post.excerpt}</div>
              <div className={styles.bottom}>
                <Link href={`/author/${post.author.slug.current}`}>
                  {post.author.name}
                </Link>
                <p>{formattedDate}</p>
              </div>
            </div>
            <div className={`${styles.imageWrapper} imageWrapper`}>
              <img
                src={post?.mainImage.blurDataURL}
                alt=""
                decoding="async"
                loading="lazy"
                className="cover-image"
              />
              <picture>
                <source
                  srcSet={`${post?.mainImage.asset.url}?auto=format&w=600&q=90, ${post?.mainImage.asset.url}?auto=format&w=1400&q=90 2x`}
                  media="(min-width: 768px)"
                />
                <source
                  srcSet={`${post?.mainImage.asset.url}?auto=format&w=550&q=100`}
                  media="(max-width: 767px)"
                />
                {/*<img alt="" decoding="async" loading="lazy" className="cover-image" onLoad={onLoad}/>*/}
                <img
                  alt=""
                  decoding="async"
                  loading="lazy"
                  className="cover-image"
                />
              </picture>
              <figcaption className={`imageCaption`}>
                {post?.mainImage.caption && (
                  <span>{post?.mainImage.caption}</span>
                )}
              </figcaption>
            </div>
          </>
        )}
      </section>

      <section className={styles.postBody}>
        <div className={`richText martina-light`}>
          {/*{post.body && <PortableText value={post.body} />}*/}
        </div>
      </section>

      {/* For convenience showing comment component regardless of a user's subscription status
      so that it can be styled  */}

      {postId && <Comment postId={postId} />}

      {/* Conditionally showing comment component based on a user's subscription status */}

      {/* {userDetails?.subscription_id ? (
        <Comment />
      ) : (
        <h2>
          {userDetails ? (
            <Link href="/subscribe">Subscribe</Link>
          ) : (
            <Link href="/sign-in">Sign-In</Link>
          )}
          to comment
        </h2>
      )} */}

      <RemainingArticleEls />

      <RelatedArticles relatedArticles={relatedArticles} />
    </>
  );
}
