import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import styles from "../../../styles/pages/home.module.scss"
import React from "react";
import FeaturedNewsletters from "@/components/featuredNewsletters";

export default function Industry({ pageData, publicationPosts, publicationNewsletters }) {
  return (
    <>
        <div className="featuredPostsTop pb-20 c-20">
          {pageData.tagline}
          <span className="caslon-med">Sign up for <Link href={`/newsletters`}>The Industry Newsletter</Link></span>
        </div>

        <Featured post={publicationPosts[0]} pathPrefix="" />

        <FeaturedNewsletters newsletters={publicationNewsletters} />

        <section className="postGrid c-20">
          {publicationPosts.map(post => (
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
