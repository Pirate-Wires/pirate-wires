import styles from "@/components/_styles/latestWriters.module.scss";
import Image from "next/image";
import Link from "next/link";
import {urlForImage} from "@/lib/sanity/image";
export default function AuthorTile({ authorData }) {
  const imageProps = authorData.image
    ? urlForImage(authorData.image)
    : null;
  // console.log(authorData, imageProps)

  return (
    <Link
      key={authorData.name}
      href={`/author/author-name`} className="authorTile hasGoIcon">
      <div className={`${styles.imgWrapper} imgWrapper mb-20`}>
        <Image
          src={imageProps.src}
          {...(authorData.image.blurDataURL && {
            placeholder: "blur",
            blurDataURL: authorData.image.blurDataURL
          })}
          alt={authorData.image?.alt || "Thumbnail"}
          priority
          fill
          className="object-cover"
        />
      </div>
      <p className={styles.name}>{authorData.name}
        <div className="goIcon">
          <div className="leftHalf"></div>
          <div className="rightHalf"></div>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
          </svg>
        </div>
      </p>
      <p className={`${styles.title} caslon-med`}>{authorData.title}</p>
    </Link>
  );
}