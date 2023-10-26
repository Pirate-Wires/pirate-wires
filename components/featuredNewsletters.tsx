"use client"
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import styles from "./_styles/featuredNewsletter.module.scss";
import useEmblaCarousel from 'embla-carousel-react'
import {useEffect} from "react";

export default function FeaturedNewsletters({ post, pathPrefix }) {
  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  // Extract the image color
  const imageColor = post?.mainImage?.ImageColor || "black";

  // Create a CSS radial gradient string using the extracted color
  const radialGradient = `radial-gradient(ellipse at center, ${imageColor}, transparent)`;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1 })
  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes())
    }
  }, [emblaApi]);
  return (
    <section className={styles.featuredNewsletters}>
      <div className={styles.left}>
        <h3>Latest Newsletters</h3>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            <div className={`${styles.slide} embla__slide`}>
              <div className={styles.slideTop}>
                {/*<Image src={} alt={} />*/}
                <h5>Regulate Me, Daddy</h5>
                <p className="caslon-med">pirate wires #101 // the "center for countering digital hate," a little bit of barbie, and what happens when atlas (fed up soccer moms) shrug? paging karen (please come back we're sorry)</p>
              </div>
            </div>
            <div className={`${styles.slide} embla__slide`}>
              <div className={styles.slideTop}>
                {/*<Image src={} alt={} />*/}
                <h5>The White Pill: Moon Memo</h5>
                <p className="caslon-med">pirate wires #100 // meta goes to war with twitter, threads' meteoric rise, a battle for the heart of amphetamine-crazed shitposters, and the future of american speech</p>
              </div>
            </div>
            <div className={`${styles.slide} embla__slide`}>
              <div className={styles.slideTop}>
                {/*<Image src={} alt={} />*/}
                <h5>Brace for Impact</h5>
                <p className="caslon-med">pirate wires #99 // an unthinkable voyage to titanic concludes, marxists seize the discourse, dehumanizing "tech bros," and a final thought on risk for glory</p>
              </div>
            </div>
          </div>
          <div className={styles.controls}>
            <button className={`${styles.prev} prev`}>
              <svg x="0px" y="0px" viewBox="0 0 32 32">
                <rect fill="#060606" y="0" className="st0" width="32" height="32"/>
                <path fill="#F1CB45" d="M20,16.5h0.5v-1H20V16.5z M11.6,15.6c-0.2,0.2-0.2,0.5,0,0.7l3.2,3.2c0.2,0.2,0.5,0.2,0.7,0
                  c0.2-0.2,0.2-0.5,0-0.7L12.7,16l2.8-2.8c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L11.6,15.6z M20,15.5h-8v1h8V15.5z"/>
              </svg>
            </button>
            <button className={`next`}>
              <svg x="0px" y="0px" viewBox="0 0 32 32">
                <rect fill="#060606" width="32" height="32"/>
                <path fill="#F1CB45" d="M12,15.5h-0.5v1H12V15.5z M20.4,16.4c0.2-0.2,0.2-0.5,0-0.7l-3.2-3.2c-0.2-0.2-0.5-0.2-0.7,0
                  c-0.2,0.2-0.2,0.5,0,0.7l2.8,2.8l-2.8,2.8c-0.2,0.2-0.2,0.5,0,0.7c0.2,0.2,0.5,0.2,0.7,0L20.4,16.4z M12,16.5h8v-1h-8V16.5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <h3>Join, or die</h3>
        <p>Sign up for the White Pill, a weekly newsletter — and occasional stories — covering the most inspiring, fascinating, and evocative developments in technology, from engineering to medicine, and science, from physics and astronomy to space and beyond.</p>
        <form className={`${styles.form}`}>
          <input type="email" />
          <button type="submit">Sign Up</button>
        </form>
        <p className={styles.tagline}></p>
      </div>
    </section>
  );
}
