"use client"

import Link from 'next/link';
import styles from "./_styles/meganav.module.scss"
import { usePathname } from 'next/navigation';
import React from "react";

export default function Navigation({ globalFields, publication }) {
  const currentRoute = usePathname();
  // const loggedIn = condition
  return (
    <>
      <nav className={styles.megaNav}>
        <div className={styles.top}>

        </div>
        <div className={styles.middle}>

        </div>
        <div className={styles.bottom}>

        </div>
      </nav>
    </>
  )
}
