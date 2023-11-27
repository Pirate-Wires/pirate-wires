import Image from "next/image";
import Link from "next/link";
import {urlForImage} from "@/lib/sanity/image";
import styles from "./_styles/latestWriters.module.scss";
import PostList from "@/components/postlist";
import AuthorTile from "@/components/authorTile";
export default function LatestWriters({latestAuthors}) {
  // const imageProps = post?.mainImage
  //   ? urlForImage(post?.mainImage)
  //   : null;
  //
  // // Extract the image color
  // const imageColor = author?.mainImage?.ImageColor || "black";

  // Create a CSS radial gradient string using the extracted color
  // const radialGradient = `radial-gradient(ellipse at center, ${imageColor}, transparent)`;

  return (
    <div className={styles.latestWriters}>
      <div className={`${styles.inner} c-20`}>
        <div className={styles.top}>
          <div className={styles.left}>
            <h3>Staff Writers</h3>
            <p className={`${styles.blurb} martina-light`}>
              Learn more about the People behind what you read.
            </p>
          </div>
          <Link href={`/authors`}>
            See all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none">
              <path
                d="M0.744407 8.61832H16.6441M16.6441 8.61832L8.69427 0.668457M16.6441 8.61832L8.69427 16.5682"
                stroke="#E3E3E3"
                strokeWidth="0.699553"
              />
            </svg>
          </Link>
        </div>

        <div className={styles.bottom}>
          {latestAuthors.map(author => (
            <AuthorTile key={author.name} authorData={author} />
          ))}
        </div>
        <Link href={`/authors`} className={`${styles.mobileViewAll} btn`}>
          See all
        </Link>
      </div>
    </div>
  );
}
