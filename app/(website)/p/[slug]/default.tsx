
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
import {useDateFormatter} from "@/hooks/useDateFormatter";
import styles from "@/styles/pages/article.module.scss"
import CommentSection from '@/lib/supabase-comments/components/comments/CommentSection';
import React from "react";

export default async function Post(props) {
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  const user = session?.user;
  console.log('user', user)

  console.log(user?.id);
  console.log(user?.email);
  console.log(user?.aud);
  console.log(user?.role);



  const { loading, post } = props;

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }

  // const [loaded, setLoaded] = useState(false)
  // const onLoad = () => {
  //   setTimeout(() => {
  //     setLoaded(true)
  //   }, 250)
  // }

  return (
    <>
      <section className={styles.articleHero}>
        <div className={`${styles.imageWrapper} imageWrapper`}>
          {/*{!loaded &&*/}
          {/*  <img src={post?.mainImage.blurDataURL} alt="" decoding="async" loading="lazy" className="cover-image"/>*/}
          {/*}*/}
          <img src={post?.mainImage.blurDataURL} alt="" decoding="async" loading="lazy" className="cover-image"/>
          <picture>
            <source srcSet={`${post?.mainImage.asset.url}?auto=format&w=600&q=90, ${post?.mainImage.asset.url}?auto=format&w=1400&q=90 2x`} media="(min-width: 768px)" />
            <source srcSet={`${post?.mainImage.asset.url}?auto=format&w=550&q=100`} media="(max-width: 767px)" />
            {/*<img alt="" decoding="async" loading="lazy" className="cover-image" onLoad={onLoad}/>*/}
            <img alt="" decoding="async" loading="lazy" className="cover-image"/>
          </picture>
          <figcaption>
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
          <div className={styles.preface}>
            {post.preface}
          </div>
          <div className={styles.bottom}>
            <Link href={`/author/${post.author.slug.current}`}>
              {post.author.name}
            </Link>
            <p>{useDateFormatter(post?.publishedAt || post._createdAt, true)}</p>
          </div>
        </div>
      </section>

      <section className={styles.postBody}>
        <div className={`${styles.richText} caslon-reg`}>
          {post.body && <PortableText value={post.body} />}
        </div>
      </section>

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

      <Container>
        <section className="mx-auto max-w-screen-md border py-24">
          <CommentSection />
        </section>
      </Container >
    </>
  );
}
