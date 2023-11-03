"use client"
// app/(website)/p/[slug]/home.tsx
import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/(website)/supabase-server';
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import styles from "@/styles/pages/article.module.scss"
import articleCountStyles from "@/components/_styles/articleCountEls.module.scss"
// import CommentSection from '@/lib/supabase-comments/components/comments/CommentSection';
import React, {useState} from "react";
import RelatedArticles from "@/components/relatedArticles";
import RemainingArticleEls from "@/components/remainingArticleEls";
import {useScrollBasedAnims} from "@/hooks/useScrollBasedAnims";
import {CommentsContextProvider, useComments} from "@/lib/comments/lib/hooks/use-comments";
import CommentSection from "@/lib/comments/lib/components/comments/CommentSection";

export default function Post(props) {
  const { loading, post, session, thisSectionArticles } = props;
  const user = session?.user;
  console.log('user', user)

  console.log(user?.id);
  console.log(user?.email);
  console.log(user?.aud);
  console.log(user?.role);


  const { count } = useComments();


  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }
  let relatedArticles = post.related_posts
  if (!relatedArticles) {
    relatedArticles = []
    for (let i = 0; i < 4; i++) {
      if (relatedArticles.length < 3 && thisSectionArticles[i].title !== post.title) {
        relatedArticles.push(thisSectionArticles[i])
      }
    }
  }
  console.log(relatedArticles)
  useScrollBasedAnims()
  const [loaded, setLoaded] = useState(false)
  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 250)
  }
  return (
    <>
      <section className={`${styles.articleHero} ${post.wide_image_top ? styles.wideImageTop : ""} ${post.wide_image_top ? "c-20" : ""}`}>
        {!post.wide_image_top ?
          <>
            <div className={`${styles.imageWrapper} imageWrapper`}>
              {!loaded &&
                <img src={post?.mainImage.blurDataURL} alt="" decoding="async" loading="lazy" className="cover-image"/>
              }
              <img src={post?.mainImage.blurDataURL} alt="" decoding="async" loading="lazy" className="cover-image" />
              <picture>
                <source srcSet={`${post?.mainImage.asset.url}?auto=format&w=600&q=90, ${post?.mainImage.asset.url}?auto=format&w=1400&q=90 2x`} media="(min-width: 768px)" />
                <source srcSet={`${post?.mainImage.asset.url}?auto=format&w=550&q=100`} media="(max-width: 767px)" />
                <img alt="" decoding="async" loading="lazy" className="cover-image" onLoad={onLoad}/>
              </picture>
              <figcaption className={`imageCaption`}>
                {post?.mainImage.caption && (
                  <span>
                    {post?.mainImage.caption}
                  </span>
                )}
              </figcaption>
            </div>
            <div className={styles.right}>
              <h1>
                {post.title}
              </h1>
              <div className={styles.excerpt}>
                {post.excerpt}
              </div>
              <div className={styles.bottom}>
                <Link href={`/author/${post.author.slug.current}`}>
                  {post.author.name}
                </Link>
                <p>{useDateFormatter(post?.publishedAt || post._createdAt, true)}</p>
              </div>
            </div>

          </> :

          <>
            <div className={`${styles.top}`}>
              <h1>
                {post.title}
              </h1>
              <div className={styles.excerpt}>
                {post.excerpt}
              </div>
              <div className={styles.bottom}>
                <Link href={`/author/${post.author.slug.current}`}>
                  {post.author.name}
                </Link>
                <p>{useDateFormatter(post?.publishedAt || post._createdAt, true)}</p>
              </div>
            </div>
            <div className={`${styles.imageWrapper} imageWrapper`}>
              <img src={post?.mainImage.blurDataURL} alt="" decoding="async" loading="lazy" className="cover-image" />
              <picture>
                <source srcSet={`${post?.mainImage.asset.url}?auto=format&w=600&q=90, ${post?.mainImage.asset.url}?auto=format&w=1400&q=90 2x`} media="(min-width: 768px)" />
                <source srcSet={`${post?.mainImage.asset.url}?auto=format&w=550&q=100`} media="(max-width: 767px)" />
                {/*<img alt="" decoding="async" loading="lazy" className="cover-image" onLoad={onLoad}/>*/}
                <img alt="" decoding="async" loading="lazy" className="cover-image" />
              </picture>
              <figcaption className={`imageCaption`}>
                {post?.mainImage.caption && (
                  <span>
                    {post?.mainImage.caption}
                  </span>
                )}
              </figcaption>
            </div>
          </>
        }
      </section>

      <section className={styles.postBody}>
        <div className={`richText caslon-reg`}>
          {post.body && <PortableText value={post.body} />}
        </div>
      </section>

      <CommentsContextProvider postId={1}>
        <section className={`${styles.commentsSection} pb-40`}>
          <div className={styles.commentsTop}>
            {count ? count : 0} Comments
          </div>

          <div className={`${styles.commentsBottom} pt-40`}>
            <CommentSection />
          </div>
        </section>
      </CommentsContextProvider>

      <RemainingArticleEls />

      {/* Paid Content
      <Container>
        <article className="mx-auto max-w-screen-md ">
          <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-500 border p-12">



            <div className="flex justify-center">
              <div className="w-full max-w-screen-md">
                <div className="flex justify-center">
                  <div className="flex flex-col items-center justify-center w-full max-w-screen-md">
                    <div className="flex flex-col items-center justify-center w-full max-w-screen-md text-xs text-gray">
                      Paid content block for: {user?.email}, {user?.id}, {user?.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {post.paidContent && <PortableText value={post.paidContent} />}
          </div>
        </article>
        {post.author && <AuthorTile author={post.author} />}
      </Container>*/}

      {/* <Container>
        <section className="mx-auto max-w-screen-md border py-24">
          <CommentSection />
        </section>
      </Container > */}


      <RelatedArticles relatedArticles={relatedArticles} />
    </>
  );
}
