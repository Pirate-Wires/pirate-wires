import {getGlobalFields} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import styles from "@/styles/pages/notFound.module.scss"
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  const globalFields = await getGlobalFields();
  return (
    <div className="colorWrapper" style={{
    "--color": "#E3E3E3",
    "--bgColor": "#060606",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <section className={styles.notFound}>
      <div className={styles.imagesWrapper}>
        <div className={styles.imageWrapper}>
          <Image src={'/img/handwire1.jpg'}
                 className="object-cover"
                 quality={100}
                 priority
                 fill
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image src={'/img/handwire2.jpg'}
                 className="object-cover"
                 quality={100}
                 priority
                 fill
          />
        </div>
      </div>
      <h1>404 – Wires Disconnected</h1>
      <Link href={"/"} className={`${styles.btn} btn square`}>Go to home</Link>
    </section>
    <Footer globalFields={globalFields} />
  </div>
  )
}
