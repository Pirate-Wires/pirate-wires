"use client"
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { notFound } from "next/navigation";
import React, {useState} from "react";
import styles from "@/styles/pages/utilityPage.module.scss"
import Link from "next/link";
import {useScrollBasedAnims} from "@/hooks/useScrollBasedAnims";

export default function Utility({ pageData }) {
  const slug = pageData.slug.current;
  if (!slug) {
    notFound();
  }
  useScrollBasedAnims()
  return (
    <>
      <section className={`${styles.utilityPage} c-20`}>
        <h1>{pageData.title}</h1>
        <div className={`${styles.pageBody}`}>
          <div className={`richText caslon-reg`}>
            {pageData.body && <PortableText value={pageData.body} />}
          </div>
          {pageData.subscribeCta &&
            <div className={`${styles.subscribeCta}`}>
              <h3>Support Us by<br /> Subscribing Today.</h3>
              <p>Get access to all our articles and newsletters from Pirate Wires, The White Pill & The Industry</p>
              <Link href={'/subscribe'} className={`${styles.subscribeBtn} btn`}>Subscribe Now – 14 Days Free Trial </Link>
              <p>Already have an account? <Link href={'/sign-in'}>Sign In</Link></p>
            </div>
          }
        </div>
      </section>
    </>
  );
}