import Image from "next/image";
import Link from "next/link";
import styles from "./_styles/latestWriters.module.scss"
export default function LatestWriters({author}) {
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
            <h3>Latest Writers</h3>
            <p className={styles.blurb}></p>
          </div>
          <Link
            href={`/authors`}>
            See all
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
              <path d="M0.744407 8.61832H16.6441M16.6441 8.61832L8.69427 0.668457M16.6441 8.61832L8.69427 16.5682" stroke="#E3E3E3" stroke-width="0.699553"/>
            </svg>
          </Link>
        </div>

        <div className={styles.bottom}>
          <Link
            href={`/author/author-name`} className="authorTile hasGoIcon">
            <div className={`${styles.imgWrapper} imgWrapper mb-20`}>

            </div>
            <p className={styles.name}>Mike Solana
              <div className="goIcon">
                <div className="leftHalf"></div>
                <div className="rightHalf"></div>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
                </svg>
              </div>
            </p>
            <p className={`${styles.title} caslon-med`}>Founder & Writer</p>
          </Link>
          <Link
            href={`/author/author-name`} className="authorTile hasGoIcon">
            <div className={`${styles.imgWrapper} imgWrapper mb-20`}>

            </div>
            <p className={styles.name}>Mike Solana
              <div className="goIcon">
                <div className="leftHalf"></div>
                <div className="rightHalf"></div>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
                </svg>
              </div>
            </p>
            <p className={`${styles.title} caslon-med`}>Founder & Writer</p>
          </Link>
          <Link
            href={`/author/author-name`} className="authorTile hasGoIcon">
            <div className={`${styles.imgWrapper} imgWrapper mb-20`}>

            </div>
            <p className={styles.name}>Mike Solana
              <div className="goIcon">
                <div className="leftHalf"></div>
                <div className="rightHalf"></div>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
                </svg>
              </div>
            </p>
            <p className={`${styles.title} caslon-med`}>Founder & Writer</p>
          </Link>
          <Link
            href={`/author/author-name`} className="authorTile hasGoIcon">
            <div className={`${styles.imgWrapper} imgWrapper mb-20`}>

            </div>
            <p className={styles.name}>Mike Solana
              <div className="goIcon">
                <div className="leftHalf"></div>
                <div className="rightHalf"></div>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
                </svg>
              </div>
            </p>
            <p className={`${styles.title} caslon-med`}>Founder & Writer</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
