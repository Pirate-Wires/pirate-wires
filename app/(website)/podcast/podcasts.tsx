"use client"
import styles from "@/styles/pages/podcast.module.scss"
import Link from "next/link";
import {useHoverArrow} from "@/hooks/useHoverArrow";

export default function Podcasts({ pageData }) {
  useHoverArrow()
  return (
    <div className="c-20">
      <div className={styles.top}>
        <h1 className="pageTitle">{pageData.title}</h1>
      </div>
      {pageData.podcast_list.map((podcast) => (
          <div key={podcast.title} className={`${styles.podcastRow} pt-40`}>
            <div className={styles.left}>
              <h3 className={styles.title}>{podcast.title}</h3>
              <div className={styles.linkRow}>
                {podcast.youtube_link &&
                  <Link target="_blank" href={podcast.youtube_link} className="hasHoverArrow">
                    Youtube
                    <span>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" stroke-width="0.699553"/>
                      </svg>
                    </span>
                  </Link>
                }
                {podcast.apple_link &&
                  <Link target="_blank" href={podcast.apple_link} className="hasHoverArrow">
                    Apple Podcasts
                    <span>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" stroke-width="0.699553"/>
                      </svg>
                    </span>
                  </Link>
                }
                {podcast.spotify_link &&
                  <Link target="_blank" href={podcast.spotify_link} className="hasHoverArrow">
                    Spotify
                    <span>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.744141 12.1215L11.987 0.878662M11.987 0.878662H0.744141M11.987 0.878662V12.1215" stroke="#E3E3E3" stroke-width="0.699553"/>
                      </svg>
                    </span>
                  </Link>
                }
              </div>
            </div>
            <div className={styles.right}>
              <p className={styles.excerpt}>{podcast.excerpt}</p>
              <p className={styles.authorList}>{podcast.author_list}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
