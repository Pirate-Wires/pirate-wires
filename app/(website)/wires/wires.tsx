import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import styles from "../../../styles/home.module.scss"
import React from "react";
import FeaturedNewsletters from "@/components/featuredNewsletters";

export default function Wires({ pageData, publicationPosts, publicationNewsletters }) {
  return (
    <>
      <div className="featuredPostsTop pb-20 c-20">
        News from the Tech World
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
        <div className="dummySlide"></div>
        <div className="dummySlide"></div>
      </section>
    </>
  );
}
