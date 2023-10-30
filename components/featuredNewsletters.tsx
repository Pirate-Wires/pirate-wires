"use client"
import Image from "next/image";
import styles from "./_styles/featuredNewsletter.module.scss";
import useEmblaCarousel from 'embla-carousel-react'
import {useEffect, useState} from "react";
import {windowWidth} from "@/constants/globalStorage";
export default function FeaturedNewsletters({ newsletters }) {
  const [loaded, setLoaded] = useState(false)
  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 250)
  }
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', containScroll: "trimSnaps" })
  useEffect(() => {
    if (emblaApi) {
      emblaApi.slidesToScroll = windowWidth > 767 ? 2 : 1
      const prev = document.getElementById("prev")
      const next = document.getElementById("next")
      prev.addEventListener("click", () => {
        emblaApi.scrollPrev()
        if (next.classList.contains("disabled")) {
          next.classList.remove("disabled")
        }
        if (!emblaApi.canScrollPrev()) {
          prev.classList.add("disabled")
        }
      })
      next.addEventListener("click", () => {
        emblaApi.scrollNext()
        if (prev.classList.contains("disabled")) {
          prev.classList.remove("disabled")
        }
        if (!emblaApi.canScrollNext()) {
          next.classList.add("disabled")
        }
      })
    }
  }, [emblaApi]);
  return (
    <section className={`${styles.featuredNewsletters} c-20 pb-40 pt-20`}>
      <div className={`${styles.left} featNewslettersBorder pt-20`}>
        <h3>Latest Newsletters</h3>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {newsletters.slice(0, 10).map(newsletter => (
              <div key={newsletter.title} className={`${styles.slide} embla__slide`}>
                <div className={styles.slideTop}>
                  <div className={styles.imageWrapper}>
                    {(newsletter.mainImage && newsletter.mainImage.asset) && (
                      <>
                        {!loaded &&
                          <img src={newsletter.mainImage.blurDataURL} alt="" decoding="async" loading="lazy" className="cover-image"/>
                        }
                        <picture>
                          <source srcSet={`${newsletter.mainImage.asset.url}?auto=format&w=50&q=100, ${newsletter.mainImage.asset.url}?auto=format&w=60&q=90 2x`} />
                          <img alt="" decoding="async" loading="lazy" className="cover-image" onLoad={onLoad}/>
                        </picture>
                      </>
                    )}
                  </div>

                  <h5>{newsletter.title}</h5>
                </div>
                <p className="caslon-med">{newsletter.excerpt}</p>
              </div>
            ))}
          </div>
          <div className={styles.controls}>
            <button className={`${styles.prev} disabled prev`} id="prev">
              <svg x="0px" y="0px" viewBox="0 0 32 32">
                <rect fill="#060606" y="0" className="st0" width="32" height="32"/>
                <path fill="#F1CB45" d="M20,16.5h0.5v-1H20V16.5z M11.6,15.6c-0.2,0.2-0.2,0.5,0,0.7l3.2,3.2c0.2,0.2,0.5,0.2,0.7,0
                  c0.2-0.2,0.2-0.5,0-0.7L12.7,16l2.8-2.8c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L11.6,15.6z M20,15.5h-8v1h8V15.5z"/>
              </svg>
            </button>
            <button className={`next`} id="next">
              <svg x="0px" y="0px" viewBox="0 0 32 32">
                <rect fill="#060606" width="32" height="32"/>
                <path fill="#F1CB45" d="M12,15.5h-0.5v1H12V15.5z M20.4,16.4c0.2-0.2,0.2-0.5,0-0.7l-3.2-3.2c-0.2-0.2-0.5-0.2-0.7,0
                  c-0.2,0.2-0.2,0.5,0,0.7l2.8,2.8l-2.8,2.8c-0.2,0.2-0.2,0.5,0,0.7c0.2,0.2,0.5,0.2,0.7,0L20.4,16.4z M12,16.5h8v-1h-8V16.5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.right} featNewslettersBorder pt-20`}>
        <h3>Join, or die</h3>
        <p>Sign up for the White Pill, a weekly newsletter — and occasional stories — covering the most inspiring, fascinating, and evocative developments in technology, from engineering to medicine, and science, from physics and astronomy to space and beyond.</p>
        <form className={`${styles.form}`}>
          <input type="email" required placeholder="Your email here..."/>
          <button type="submit">Sign Up</button>
        </form>
        <p className={styles.tagline}></p>
      </div>
    </section>
  );
}
