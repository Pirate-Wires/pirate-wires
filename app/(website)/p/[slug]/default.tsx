
// app/(website)/p/[slug]/home.tsx
import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/(website)/supabase-server';
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/blog/authorCard";
import {useDateFormatter} from "@/hooks/useDateFormatter";

import CommentSection from '@/lib/supabase-comments/components/comments/CommentSection';
import SidebarComments from '@/lib/supabase-comments/components/comments/SidebarComments';
import MessageBubbleButton from '@/lib/supabase-comments/components/comments/MessageBubbleButton';
import HeartButton from '@/lib/supabase-comments/components/comments/HeartButton';
import { ModalProvider } from '@/lib/supabase-comments/hooks/use-modal';
import Github from '@/lib/supabase-comments/icons/Github';

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

  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  console.log('post', post)


  return (
    <>
      <Container className="!pt-0">
        <div className="mx-auto max-w-screen-md ">
          <div className="flex justify-center">
            <CategoryLabel categories={post.categories} />
          </div>

          <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            {post.title}
          </h1>

          <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                {AuthorimageProps && (
                  <Link href={`/author/${post.author.slug.current}`}>
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="40px"
                    />
                  </Link>
                )}
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  <Link href={`/author/${post.author.slug.current}`}>
                    {post.author.name}
                  </Link>
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post?.publishedAt || post._createdAt}>
                    {useDateFormatter(post?.publishedAt || post._createdAt)}
                  </time>
                  <span>· {post.estReadingTime || "5"} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>



      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        {imageProps && (
          <Image
            src={imageProps.src}
            alt={post.mainImage?.alt || "Thumbnail"}
            loading="eager"
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <Container>
        <article className="mx-auto max-w-screen-md ">
          <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-500">
            {post.body && <PortableText value={post.body} />}
          </div>
        </article>

      </Container>




      {/* Paid Content */}
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
        {post.author && <AuthorCard author={post.author} />}
      </Container>

      <Container>
        <section className="mx-auto max-w-screen-md border py-24">
          <CommentSection />
        </section>
      </Container >
    </>
  );
}

const MainImage = ({ image }) => {
  return (
    <div className="mb-12 mt-12 ">
      {/* @ts-ignore */}
      <Image {...urlForImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};
