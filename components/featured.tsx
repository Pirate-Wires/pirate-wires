import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import styles from "./_styles/featuredPost.module.scss";
import Link from "next/link";

export default function Featured({ post, pathPrefix }) {

  return (
    <article
      className={`featuredPost hasGoIcon c-20`}>
      <Link
        href={`/p/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug.current
        }`}>

        <div className={`${styles.postInfo} postInfo ptb-20`}>
          <h1 className={styles.title}>
            {post.title}
          </h1>

          <div className={styles.bottom}>
            <p className="excerpt caslon-reg">{post.preface}</p>
            <p className="postAuthor">By {post.author.name}
              <div className="goIcon">
                <div className="leftHalf"></div>
                <div className="rightHalf"></div>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
                </svg>
              </div>
            </p>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={post.mainImage.asset.url}
            {...(post.mainImage.blurDataURL && {
              placeholder: "blur",
              blurDataURL: post.mainImage.blurDataURL
            })}
            alt={post.mainImage?.alt || "Thumbnail"}
            priority
            fill
            className="object-cover"
          />
        </div>
      </Link>
    </article>
  );
}
