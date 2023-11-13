"use client"
import styles from "./_styles/featuredPost.module.scss";
import Link from "next/link";
import {useState} from "react";

export default function Featured({ post, pathPrefix, priority = true }) {
  const [loaded, setLoaded] = useState(false)
  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 250)
  }
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
            <p className="excerpt caslon-reg">
              <svg preserveAspectRatio="none" viewBox="0 0 400 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line vectorEffect="non-scaling-stroke" y1="0.65" x2="400" y2="0.65" stroke="var(--color)" strokeOpacity="0.5" strokeWidth="0.7" strokeDasharray="5 5"/>
              </svg>
              {post.excerpt}
            </p>
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
          {!loaded &&
            <img src={post.mainImage.blurDataURL} alt="" decoding="async" fetchPriority="high" className="cover-image"/>
          }
          <picture>
            <source srcSet={`${post.mainImage.asset.url}?auto=format&w=1000&q=90, ${post.mainImage.asset.url}?auto=format&w=1400&q=90 2x`} media="(min-width: 768px)" />
            <source srcSet={`${post.mainImage.asset.url}?auto=format&w=500&q=100`} media="(max-width: 767px)" />
            <img alt="" decoding="async" fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} className="cover-image" onLoad={onLoad}/>
          </picture>
        </div>
      </Link>
    </article>
  );
}
