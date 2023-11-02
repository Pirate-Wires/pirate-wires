"use client"

import Link from 'next/link';
import styles from "./_styles/meganav.module.scss"
import { usePathname } from 'next/navigation';
import React from "react";

export default function MegaNav({ globalFields, publication }) {
  const currentRoute = usePathname();
  // const loggedIn = condition
  return (
    <>
      <nav className={styles.megaNav} id="mega-nav">
        <button className={`${styles.closeNav} close-trigger hitbox`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.63306" y="0.00151062" width="20" height="2" transform="rotate(45 1.63306 0.00151062)" fill="#1C1C1C"/>
            <rect x="0.218994" y="14.1421" width="20" height="2" transform="rotate(-45 0.218994 14.1421)" fill="#1C1C1C"/>
          </svg>
        </button>
        <div className={`${styles.top} fade-el`}>
          <Link href="/subscribe">Subscribe</Link>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/newsletters">Newsletters</Link>
        </div>
        <div className={`${styles.middle} fade-el`}>
          <Link href="/wires">Pirate Wires</Link>
          <Link href="/white-pill">The White Pill</Link>
          <Link href="/industry">The Industry</Link>
        </div>
        <div className={`${styles.bottom} fade-el`}>
          <Link href="/search">Search</Link>
          <Link href="/about-us">About</Link>
          <Link href="/authors">Writers</Link>
          <Link href="/careers">Careers</Link>
        </div>

        <div className={styles.socialRow}>
          <a href="https://twitter.com/PirateWires" target="_blank" rel="noopener" aria-label={'Our Twitter'}>
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2954 0.862915H12.2915L7.93168 5.87948L13.0794 12.6821H9.03476L5.8831 8.55849L2.25869 12.6821H0.262638L4.9376 7.32405L0 0.862915H4.14969L7.01245 4.64504L10.2954 0.862915ZM9.5863 11.4739H10.6894L3.54562 1.9923H2.33748L9.5863 11.4739Z" fill="#1C1C1C"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/piratewires/" target="_blank" rel="noopener" aria-label={'Our Instagram'}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.23583 0.692162C3.48612 0.727534 2.97415 0.847177 2.52658 1.02305C2.06337 1.20357 1.67075 1.44582 1.28012 1.83786C0.889479 2.22991 0.648924 2.6228 0.46967 3.08672C0.296194 3.53528 0.178665 4.04767 0.145548 4.79781C0.112431 5.54794 0.105103 5.78906 0.108767 7.70251C0.112431 9.61596 0.120886 9.85581 0.157245 10.6075C0.193039 11.3571 0.31226 11.8689 0.488131 12.3166C0.668935 12.7798 0.910899 13.1723 1.30309 13.5631C1.69528 13.9538 2.08789 14.1938 2.55293 14.3734C3.00107 14.5466 3.5136 14.6647 4.26359 14.6975C5.01358 14.7303 5.25498 14.7379 7.16787 14.7343C9.08076 14.7306 9.32159 14.7222 10.0731 14.6865C10.8247 14.6508 11.3338 14.5308 11.7817 14.3558C12.2449 14.1745 12.6376 13.933 13.0281 13.5407C13.4186 13.1483 13.6591 12.7552 13.8382 12.291C14.0118 11.8428 14.1297 11.3303 14.1623 10.5809C14.1951 9.82875 14.2029 9.58862 14.1992 7.67545C14.1955 5.76228 14.187 5.52243 14.1513 4.77103C14.1156 4.01963 13.9963 3.50935 13.8206 3.06136C13.6395 2.59814 13.3978 2.20595 13.0057 1.81489C12.6137 1.42383 12.2202 1.18356 11.7562 1.00487C11.3078 0.831394 10.7955 0.71316 10.0455 0.680748C9.29552 0.648335 9.05412 0.640021 7.14053 0.643685C5.22694 0.647349 4.98737 0.655522 4.23583 0.692162ZM4.31813 13.4299C3.63113 13.4 3.25811 13.2859 3.00952 13.1903C2.68033 13.0635 2.44583 12.9102 2.19809 12.6648C1.95035 12.4195 1.79815 12.1841 1.66963 11.8556C1.5731 11.6071 1.45683 11.2345 1.4247 10.5475C1.38976 9.80493 1.38243 9.58199 1.37834 7.70082C1.37425 5.81964 1.38144 5.59698 1.41399 4.85418C1.44331 4.16774 1.55816 3.7943 1.65356 3.54585C1.78039 3.21623 1.93315 2.98216 2.17906 2.73456C2.42497 2.48695 2.65961 2.33448 2.98838 2.20595C3.23669 2.109 3.60929 1.99372 4.29601 1.96103C5.03909 1.9258 5.26175 1.91875 7.14264 1.91467C9.02354 1.91058 9.24676 1.91763 9.99013 1.95032C10.6766 1.9802 11.0502 2.09392 11.2983 2.18989C11.6277 2.31672 11.862 2.46906 12.1096 2.71539C12.3572 2.96172 12.5098 3.19551 12.6384 3.52499C12.7354 3.77259 12.8507 4.14505 12.8831 4.83219C12.9185 5.57528 12.9265 5.79808 12.9299 7.67883C12.9333 9.55959 12.9267 9.78295 12.8941 10.5255C12.8641 11.2125 12.7502 11.5856 12.6546 11.8345C12.5277 12.1636 12.3748 12.3982 12.1288 12.6457C11.8827 12.8931 11.6484 13.0456 11.3195 13.1741C11.0714 13.2709 10.6984 13.3865 10.0123 13.4192C9.26917 13.4541 9.04651 13.4615 7.16491 13.4655C5.28331 13.4696 5.06136 13.462 4.31827 13.4299M10.0623 3.9231C10.0626 4.09034 10.1124 4.25375 10.2056 4.39264C10.2987 4.53154 10.431 4.6397 10.5856 4.70343C10.7402 4.76716 10.9103 4.7836 11.0743 4.75068C11.2382 4.71776 11.3888 4.63695 11.5068 4.51848C11.6248 4.4 11.7051 4.24918 11.7374 4.08509C11.7697 3.921 11.7527 3.75101 11.6884 3.59662C11.6241 3.44223 11.5154 3.31037 11.3762 3.21773C11.237 3.12509 11.0734 3.07582 10.9061 3.07615C10.6819 3.0766 10.4671 3.16608 10.3088 3.3249C10.1506 3.48373 10.0619 3.6989 10.0623 3.9231ZM3.53615 7.69602C3.5401 9.69431 5.16296 11.3106 7.16082 11.3067C9.15869 11.3029 10.7761 9.68022 10.7723 7.68193C10.7684 5.68365 9.14516 4.06698 7.14701 4.07093C5.14887 4.07487 3.53234 5.69802 3.53615 7.69602ZM4.8053 7.69349C4.80438 7.22895 4.94124 6.77457 5.19855 6.38781C5.45588 6.00105 5.8221 5.69927 6.25093 5.52065C6.67976 5.34203 7.15192 5.29458 7.60771 5.38431C8.06351 5.47404 8.48246 5.6969 8.81159 6.02473C9.14072 6.35256 9.36524 6.77063 9.45677 7.22606C9.5483 7.68149 9.50272 8.15384 9.3258 8.58337C9.14888 9.0129 8.84856 9.38033 8.46282 9.63917C8.07708 9.89802 7.62325 10.0367 7.15871 10.0376C6.85026 10.0382 6.5447 9.97812 6.25948 9.86066C5.97427 9.74321 5.71498 9.57071 5.49644 9.35303C5.2779 9.13536 5.10438 8.87676 4.98579 8.59201C4.8672 8.30726 4.80587 8.00194 4.8053 7.69349Z" fill="#1C1C1C"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCJfW0e_2ooi5HtGPoXVjDxg" target="_blank" rel="noopener" aria-label={'Our Youtube'}>
            <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.40451 9.31369V3.86192L12.2126 6.58794L7.40451 9.31369ZM18.0995 2.1465C17.888 1.35255 17.2646 0.727352 16.4731 0.515166C15.0386 0.129545 9.28593 0.129545 9.28593 0.129545C9.28593 0.129545 3.53332 0.129545 2.0987 0.515166C1.30722 0.727352 0.683836 1.35255 0.472298 2.1465C0.0878906 3.58548 0.0878906 6.58781 0.0878906 6.58781C0.0878906 6.58781 0.0878906 9.59011 0.472298 11.0291C0.683836 11.8231 1.30722 12.4483 2.0987 12.6605C3.53332 13.0461 9.28593 13.0461 9.28593 13.0461C9.28593 13.0461 15.0386 13.0461 16.4731 12.6605C17.2646 12.4483 17.888 11.8231 18.0995 11.0291C18.484 9.59011 18.484 6.58781 18.484 6.58781C18.484 6.58781 18.484 3.58548 18.0995 2.1465Z" fill="#1C1C1C"/>
            </svg>
          </a>
          <a href="https://open.spotify.com/show/75ZY7Yb1Z4lVravv2TGUAY" target="_blank" rel="noopener" aria-label={'Our Spotify'}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.7908 6.83014C10.3496 5.38041 6.32294 5.24711 3.99255 5.95439C3.61831 6.06797 3.22256 5.85663 3.1092 5.48251C2.99577 5.10802 3.2068 4.71256 3.58132 4.59879C6.25645 3.78679 10.7035 3.9436 13.5138 5.61183C13.8504 5.81169 13.9608 6.2464 13.7613 6.58243C13.5616 6.91902 13.1265 7.02997 12.7908 6.83014ZM12.7108 8.9774C12.5395 9.25531 12.1762 9.34249 11.8986 9.17183C9.86342 7.92081 6.76006 7.55841 4.35227 8.28929C4.04003 8.38365 3.71023 8.20758 3.61538 7.89594C3.5213 7.5837 3.69744 7.25451 4.00912 7.15955C6.75967 6.3249 10.179 6.72918 12.5166 8.16565C12.7941 8.3366 12.8815 8.70013 12.7108 8.9774ZM11.7841 11.0396C11.648 11.2627 11.3575 11.3327 11.1351 11.1966C9.3567 10.1097 7.11829 9.86428 4.48216 10.4664C4.22813 10.5246 3.97495 10.3654 3.91702 10.1114C3.85884 9.85749 4.01742 9.60428 4.27201 9.54631C7.1568 8.88683 9.63139 9.17066 11.6275 10.3904C11.8501 10.5263 11.9202 10.8171 11.7841 11.0396ZM8.31099 0.116371C4.12848 0.116371 0.737793 3.50699 0.737793 7.68943C0.737793 11.8724 4.12848 15.2627 8.31099 15.2627C12.4936 15.2627 15.8841 11.8724 15.8841 7.68943C15.8841 3.50699 12.4936 0.116371 8.31099 0.116371Z" fill="#1C1C1C"/>
            </svg>
          </a>
        </div>
      </nav>
    </>
  )
}
