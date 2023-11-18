"use client"
import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import React from "react";
import FeaturedNewsletters from "@/components/featuredNewsletters";
import {useScrollBasedAnims} from "@/hooks/useScrollBasedAnims";

export default function WhitePill({
  pageData,
  publicationPosts,
  publicationNewsletters,
  user
}) {
  useScrollBasedAnims()
  return (
    <>
      <div className="featuredPostsTop ptb-20 c-20">
        <svg viewBox="0 0 196 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M51.2926 26.9852L46.6176 0H51.8992L53.2603 9.52767C53.6184 12.2115 53.8258 14.9133 53.8817 17.6203H55.08C55.08 15.9929 55.3167 13.0636 55.6866 9.82356L56.8258 0H62.7436L63.9567 9.82356C64.3266 13.0636 64.5633 15.9929 64.5781 17.6203H65.7617C65.8327 14.914 66.0401 12.2131 66.383 9.52767L67.6258 0H72.9666L68.2767 26.9852H62.3589L61.1754 18.6707C60.7422 15.7877 60.4607 12.884 60.3321 9.97151H59.1781C59.0583 12.8846 58.7768 15.7888 58.3348 18.6707L57.1513 26.9852H51.2926Z" fill="#060606"/>
          <path d="M74.52 26.9852V0H79.4318V10.0455H86.1633V0H91.0751V26.9852H86.1633V16.1852H79.4022V26.9852H74.52Z" fill="#060606"/>
          <path d="M94.4926 26.9852V0H99.3896V26.9852H94.4926Z" fill="#060606"/>
          <path d="M106.521 26.9852V5.59233H101.18V0H116.877V5.60712H111.492V27H106.521V26.9852Z" fill="#060606"/>
          <path d="M118.667 26.9852V0H132.293V5.60712H123.416V10.6521H131.671V16.1556H123.534V21.4373H132.411V26.9852H118.667Z" fill="#060606"/>
          <path d="M140.814 26.9852V0H150.253C154.041 0 157.073 2.9589 157.073 8.87671C157.073 14.7945 154.026 17.7534 150.268 17.7534H145.682V27L140.814 26.9852ZM145.682 12.383H149.706C151.304 12.383 151.762 11.9244 151.762 8.9063C151.762 5.88822 151.304 5.48877 149.706 5.48877H145.682V12.383Z" fill="#060606"/>
          <path d="M158.938 26.9852V0H163.849V26.9852H158.938Z" fill="#060606"/>
          <path d="M167.267 26.9852V0H172.179V21.3633H180.242V26.9852H167.267Z" fill="#060606"/>
          <path d="M182.52 26.9852V0H187.432V21.3633H195.495V26.9852H182.52Z" fill="#060606"/>
          <path d="M30.9649 0.562377L6.92385 6.39142C5.71645 6.69081 4.58545 7.24064 3.60421 8.00525C2.62296 8.76985 1.81338 9.73217 1.22796 10.8298C-0.0210259 13.1177 -0.339002 15.7993 0.34029 18.3158C0.937121 20.8152 2.48262 22.9845 4.64998 24.365C6.81734 25.7455 9.43663 26.2289 11.954 25.7131L35.9951 19.8692C37.2025 19.5698 38.3335 19.02 39.3147 18.2554C40.296 17.4908 41.1056 16.5285 41.691 15.4309C42.9291 13.1391 43.2415 10.46 42.5639 7.94484C41.9705 5.44739 40.4273 3.27945 38.2617 1.90112C36.0962 0.522795 33.4787 0.0425746 30.9649 0.562377ZM16.8806 11.4216L14.5874 11.9837L16.274 18.5821L14.617 18.9964L12.9304 12.3832L10.6669 12.9306L10.3562 11.5103L16.5551 10.0309L16.9249 11.5103L16.8806 11.4216ZM25.7573 16.289L24.1151 16.6884L23.257 13.3153L20.1649 14.0698L21.0526 17.4577L19.3956 17.8572L17.3096 9.80895L18.9666 9.4095L19.7655 12.5016L22.8428 11.8358L22.0438 8.72895L23.6712 8.25553L25.7573 16.289ZM32.548 14.6468L27.2515 15.9339L25.1507 7.90046L30.4175 6.61334L30.7874 8.09279L27.1628 8.8769L27.6362 10.6966L31.0685 9.92731L31.4384 11.4068L28.0356 12.2205L28.5534 14.1881L32.2225 13.3005L32.548 14.6468Z" fill="#060606"/>
        </svg>
        <div className={`taglineRow`}>
          {pageData.tagline}
          <span className="martina-reg">Sign up for <Link href={`/newsletters`}>The White Pill Newsletter</Link></span>
        </div>
      </div>
      <Featured post={publicationPosts[0]} pathPrefix="" />

      <FeaturedNewsletters
        newsletters={publicationNewsletters}
        section={'The White Pill'}
        user={user}
      />

      <section className="postGrid c-20">
        {publicationPosts.slice(1).map((post, index) => (
          // @ts-ignore
          <PostList
            key={index}
            post={post}
            aspect="landscape"
            preloadImage={true}
          />
        ))}
        <div className="dummyTile"></div>
        <div className="dummyTile"></div>
      </section>
    </>
  );
}
