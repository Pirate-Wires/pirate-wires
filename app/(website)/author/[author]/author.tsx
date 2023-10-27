import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import PostList from "@/components/postlist";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import styles from "../../../../styles/pages/authors.module.scss"

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
          <h1 className="text-brand-primary mt-2 text-3xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
            {author.name}
          </h1>
          <p>
            {author.bio && <PortableText value={author.bio} />}
          </p>
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
