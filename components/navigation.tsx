"use client"

import Link from 'next/link';
import styles from "./_styles/header.module.scss"
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import React from "react";

interface Tab {
  name: string;
  href: string;
}

const tabs: Tab[] = [
  { name: 'Home', href: '/' },
  { name: 'Wires', href: '/wires' },
  { name: 'The Industry', href: '/the-industry' },
  { name: 'The White Pill', href: '/white-pill' },
];

export default function Navigation({ globalFields }) {
  const currentRoute = usePathname();
  const flowNav = currentRoute === "/subscribe" || currentRoute === "/sign-in"
  const simpleNav = currentRoute === "/account"
  return (
    <>
      {!flowNav ?
        <header>
          {!simpleNav ?
            <nav className={styles.topTabs}>
              {tabs.map(tab => (
                <Link key={tab.href} href={tab.href} className={(currentRoute === tab.href ? styles.active : '')}>
                  <span className={styles.categoryRadio}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none">
                      <circle cx="8.49998" cy="8.5" r="7.2" fill="var(--bgColor)" stroke="var(--color)" strokeWidth="0.9" />
                      <circle className={styles.activeDot} cx="8.49999" cy="8.5" r="4.5" fill="var(--color)" stroke="var(--color)" strokeWidth="0.9" />
                    </svg>
                  </span>
                  {tab.name}
                </Link>
              ))}
            </nav> : ""
          }
          <nav className={`${styles.mainNav} c-20`}>
            <div className={styles.left}>
              <Link href="/">
                <svg viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0.0446548H7.49502C9.19222 0.0446548 10.5249 1.3507 10.5249 3.05861V11.52C10.5249 13.1163 9.19222 14.4558 7.49502 14.4558H3.8842V24H0V0.0446548ZM4.02088 13.92L6.04841 12.4354C6.33317 12.2233 6.48125 11.8995 6.48125 11.587V2.88C6.48125 2.52279 6.33317 2.21024 6.04841 1.99814L4.02088 0.569306C3.95254 0.535818 3.8728 0.569306 3.8728 0.636283V13.8419C3.8842 13.92 3.95254 13.9535 4.02088 13.92Z" fill="var(--color)" />
                  <path d="M32.8505 1.76372C32.8505 2.7014 32.1443 3.28186 31.3014 3.28186C30.4585 3.28186 29.7523 2.7014 29.7523 1.76372C29.7523 0.826048 30.4585 0.245583 31.3014 0.245583C32.1443 0.245583 32.8505 0.826048 32.8505 1.76372ZM32.5657 1.76372C32.5657 0.971164 31.9848 0.491164 31.3128 0.491164C30.6293 0.491164 30.0484 0.971164 30.0484 1.76372C30.0484 2.54512 30.6293 3.03628 31.3128 3.03628C31.9848 3.03628 32.5657 2.54512 32.5657 1.76372ZM31.6545 1.87535L31.9848 2.45582H31.5861L31.3014 1.92H31.1419V2.45582H30.7888V1.0493H31.4153C31.757 1.0493 31.9506 1.21675 31.9506 1.49582C31.9393 1.67442 31.8253 1.80837 31.6545 1.87535ZM31.1419 1.67442H31.3356C31.4836 1.67442 31.5634 1.60744 31.5634 1.49582C31.5634 1.37302 31.4836 1.30605 31.3356 1.30605H31.1419V1.67442Z" fill="var(--color)" />
                  <path d="M28.9207 0V22.5823C28.9207 23.3637 28.2829 23.9888 27.4855 23.9888H24.9682H13.6345C12.8486 23.9888 12.2221 23.3637 12.2221 22.6047V0H16.1746V21.5219C16.1746 21.7116 16.2544 21.9014 16.4025 22.0353L18.5553 23.9777V0H22.5192V21.466C22.5192 21.6558 22.5989 21.8456 22.747 21.9795L24.9682 23.9888V0H28.9207Z" fill="var(--color)" />
                </svg>
              </Link>
              <h2 className="caslon-reg">Technology, Politics, Culture</h2>
            </div>
            <div className={styles.right}>
              <Link href="/newsletters">Newsletters</Link>
              <Link href="/subscribe" className={`${styles.btn} btn square`}>Subscribe</Link>
              <Link href="/account">Sign In</Link>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="1" y2="1" stroke="var(--color)" strokeWidth="2" />
                <line x1="20" y1="7.99984" y2="7.99984" stroke="var(--color)" strokeWidth="2" />
                <line x1="20" y1="14.9998" y2="14.9998" stroke="var(--color)" strokeWidth="2" />
              </svg>
            </div>
          </nav>
        </header> :

        <header className={styles.flowHeader}>
          <Link href="/">
            <svg viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0.0444489H7.49502C9.19222 0.0444489 10.5249 1.3436 10.5249 3.04249V11.4592C10.5249 13.0471 9.19222 14.3795 7.49502 14.3795H3.8842V23.8733H0V0.0444489ZM4.02088 13.8465L6.04841 12.3697C6.33317 12.1588 6.48125 11.8367 6.48125 11.5258V2.86483C6.48125 2.5095 6.33317 2.1986 6.04841 1.98762L4.02088 0.56633C3.95254 0.533018 3.8728 0.56633 3.8728 0.632953V13.7688C3.8842 13.8465 3.95254 13.8798 4.02088 13.8465Z" fill="var(--color)" />
              <path d="M32.8521 1.75445C32.8521 2.68717 32.1459 3.26457 31.303 3.26457C30.4601 3.26457 29.7539 2.68717 29.7539 1.75445C29.7539 0.821724 30.4601 0.244324 31.303 0.244324C32.1459 0.244324 32.8521 0.821724 32.8521 1.75445ZM32.5674 1.75445C32.5674 0.966074 31.9865 0.488608 31.3144 0.488608C30.631 0.488608 30.0501 0.966074 30.0501 1.75445C30.0501 2.53172 30.631 3.02029 31.3144 3.02029C31.9865 3.02029 32.5674 2.53172 32.5674 1.75445ZM31.6561 1.86549L31.9865 2.44289H31.5878L31.303 1.9099H31.1436V2.44289H30.7904V1.0438H31.4169C31.7586 1.0438 31.9523 1.21036 31.9523 1.48796C31.9409 1.66562 31.827 1.79886 31.6561 1.86549ZM31.1436 1.66562H31.3372C31.4853 1.66562 31.565 1.59899 31.565 1.48796C31.565 1.36581 31.4853 1.29919 31.3372 1.29919H31.1436V1.66562Z" fill="var(--color)" />
              <path d="M28.9213 0V22.4631C28.9213 23.2404 28.2834 23.8622 27.4861 23.8622H24.9687H13.6351C12.8491 23.8622 12.2227 23.2404 12.2227 22.4853V0H16.1752V21.4082C16.1752 21.597 16.2549 21.7858 16.403 21.919L18.5558 23.8511V0H22.5198V21.3527C22.5198 21.5415 22.5995 21.7302 22.7476 21.8635L24.9687 23.8622V0H28.9213Z" fill="var(--color)" />
            </svg>
          </Link>
        </header>
      }
    </>
  )
}
