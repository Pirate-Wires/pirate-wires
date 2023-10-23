import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";
import SectionLabel from "@/components/blog/section";
import {useDateFormatter} from "@/hooks/useDateFormatter";

export default function PostListSmall({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight
}) {
  const imageProps = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  return (
    <>

      <div
        className={cx(
          " group",
          minimal && "grid gap-10 md:grid-cols-2"
        )}>

        <div
          className={cx(
            " overflow-hidden transition-all bg-gray-100 rounded-xs dark:bg-gray-800   hover:scale-105"
          )}>

          {/* <Link
            className={cx(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                  ? "aspect-[5/4]"
                  : "aspect-square"
            )}
            href={`/p/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug.current
              }`}>
            {imageProps ? (
              <Image
                src={imageProps.src}
                {...(post.mainImage.blurDataURL && {
                  placeholder: "blur",
                  blurDataURL: post.mainImage.blurDataURL
                })}
                alt={post.mainImage.alt || "Thumbnail"}
                priority={preloadImage ? true : false}
                className="object-cover transition-all"
                fill
                sizes="(max-width: 768px) 30vw, 33vw"
              />
            ) : (
              <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <PhotoIcon />
              </span>
            )}
          </Link> */}
        </div>

        <div className={cx(minimal && "flex items-center")}>
          <div>
            {/* <div className="pt-2">
              <SectionLabel
                section={post.section}
              />
            </div> */}

            {/* <CategoryLabel
              categories={post.categories}
              nomargin={minimal}
            /> */}
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                    ? "text-3xl"
                    : "text-lg",
                fontWeight === "normal"
                  ? "text-black font-medium  line-clamp-2 tracking-normal"
                  : "font-semibold leading-snug tracking-tight",
                "mt-2    dark:text-white"
              )}>
              <Link
                href={`/p/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug.current
                  }`}>
                <span
                  className="bg-gradient-to-r from-gray-500 to-gray-300 dark:from-purple-800 dark:to-purple-900
      bg-[length:0px_1px]
      bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_1px] group-hover:bg-[length:100%_1px]">
                  {post.title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  <Link
                    href={`/p/${pathPrefix ? `${pathPrefix}/` : ""
                      }${post.slug.current}`}
                    legacyBehavior>
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div>

            <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
              <Link
                href={`/author/${post.author.slug.current}`}
                legacyBehavior>
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 w-8 h-8">
                    {post.author.image && (
                      <Image
                        // @ts-ignore
                        src={AuthorimageProps.src}
                        // @ts-ignore
                        loader={AuthorimageProps.loader}
                        alt={post?.author?.name}
                        className="object-cover rounded-full m-1 border-transparent hover:border hover:border-gray-500"
                        fill
                        sizes="20px"
                      />
                    )}
                  </div>
                  <span className="text-sm truncate">
                    {post.author.name}
                  </span>
                </div>
              </Link>
              <span className="text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <time
                className="text-sm truncate"
                dateTime={post?.publishedAt || post._createdAt}>
                {useDateFormatter(post?.publishedAt || post._createdAt)}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
