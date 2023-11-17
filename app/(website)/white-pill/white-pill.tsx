"use client"
import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import React from "react";
import FeaturedNewsletters from "@/components/featuredNewsletters";
import {useScrollBasedAnims} from "@/hooks/useScrollBasedAnims";

export default function WhitePill({
  pageData,
  publicationPosts,
  publicationNewsletters,
  user
}) {
  useScrollBasedAnims()
  return (
    <>
      <div className="featuredPostsTop ptb-20 c-20">
        {pageData.tagline}
        <span className="martina-med">Sign up for <Link href={`/newsletters`}>The White Pill Newsletter</Link></span>
      </div>
      <Featured post={publicationPosts[0]} pathPrefix="" />

      <FeaturedNewsletters
        newsletters={publicationNewsletters}
        section={'The White Pill'}
        user={user}
      />

      <section className="postGrid c-20">
        {publicationPosts.slice(1).map((post, index) => (
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
