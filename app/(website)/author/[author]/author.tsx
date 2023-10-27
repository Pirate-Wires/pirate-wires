import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import PostList from "@/components/postlist";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import styles from "../../../../styles/pages/authors.module.scss"
import Link from "next/link";

export default function Author(props) {
  const { loading, posts, author } = props;

  const slug = author?.slug;

  if (!loading && !slug) {
    notFound();
  }

  return (
    <>
      <div className={`${styles.singleTop} c-20`}>
        <div className={styles.portraitWrapper}>
          {author?.image && (
            <Image
              src={urlForImage(author.image)?.src || ""}
              alt={author.name || " "}
              fill
              sizes="(max-width: 320px) 100vw, 320px"
              className="object-cover"
            />
          )}
        </div>
        <div className={styles.singleRight}>
          <h1 className={styles.name}>
            {author.name}
          </h1>
          <div className={styles.bio}>
            {author.bio && <PortableText value={author.bio} />}
          </div>
          <div className={styles.socialRow}>
            {author.twitter_link &&
              <Link href={author.twitter_link} target="_blank">
                Twitter
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" stroke-width="0.699553"/>
                </svg>
              </Link>
            }
            {author.social_text_two &&
              <Link href={author.social_link_two} target="_blank">
                {author.social_text_two}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" stroke-width="0.699553"/>
                </svg>
              </Link>
            }
            {author.social_text_three &&
              <Link href={author.social_link_three} target="_blank">
                {author.social_text_three}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" stroke-width="0.699553"/>
                </svg>
              </Link>
            }
          </div>
        </div>
      </div>

      <section className="postGrid c-20">
        {posts.map(post => (
          // @ts-ignore
          <PostList
            key={post._id}
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
