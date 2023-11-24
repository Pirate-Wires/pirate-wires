"use client"
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import PostList from "@/components/postlist";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import styles from "@/styles/pages/authors.module.scss"
import Link from "next/link";
import { useHoverArrow } from "@/hooks/useHoverArrow";
import { useScrollBasedAnims } from "@/hooks/useScrollBasedAnims";


export const dynamic = 'force-dynamic' as const;


export default function Author({ posts, authorData }) {
  const slug = authorData.slug.current;
  const [loaded, setLoaded] = useState(false)
  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 250)
  }
  if (!slug) {
    notFound();
  }
  useHoverArrow()
  useScrollBasedAnims()
  return (
    <>
      <div className={`${styles.singleTop} c-20`}>
        <div className={styles.portraitWrapper}>
          {authorData.image && (
            <>
              {!loaded &&
                <img src={authorData.image.blurDataURL} alt="" decoding="async" loading="lazy" className="cover-image" />
              }
              <picture>
                <source srcSet={`${authorData.image.asset.url}?auto=format&w=600&q=90, ${authorData.image.asset.url}?auto=format&w=800&q=90 2x`} media="(min-width: 768px)" />
                <source srcSet={`${authorData.image.asset.url}?auto=format&w=550&q=100`} media="(max-width: 767px)" />
                <img alt="" decoding="async" loading="lazy" className="cover-image" onLoad={onLoad} />
              </picture>
            </>
          )}
        </div>
        <div className={styles.singleRight}>
          <h1 className={styles.name}>
            {authorData.name}
          </h1>
          <div className={styles.bio}>
            {authorData.bio && <PortableText value={authorData.bio} />}
          </div>
          <div className={styles.socialRow}>
            {authorData.twitter_link &&
              <Link href={authorData.twitter_link} target="_blank" className="hasHoverArrow">
                Twitter
                <span>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" strokeWidth="0.699553" />
                  </svg>
                </span>
              </Link>
            }
            {authorData.social_text_two &&
              <Link href={authorData.social_link_two} target="_blank" className="hasHoverArrow">
                {authorData.social_text_two}
                <span>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" strokeWidth="0.699553" />
                  </svg>
                </span>
              </Link>
            }
            {authorData.social_text_three &&
              <Link href={authorData.social_link_three} target="_blank" className="hasHoverArrow">
                {authorData.social_text_three}
                <span>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" strokeWidth="0.699553" />
                  </svg>
                </span>
              </Link>
            }
          </div>
        </div>
      </div>

      <section className="postGrid c-20">
        {posts.map((post, index) => (
          // @ts-ignore
          <PostList
            key={index}
            post={post}
            aspect="landscape"
            preloadImage={true}
          />
        ))}
        <div className="dummyTile"></div>
        <div className="dummyTile"></div>
      </section>
    </>
  );
}
