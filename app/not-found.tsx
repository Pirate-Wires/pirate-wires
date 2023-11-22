import {getGlobalFields} from "@/lib/sanity/client";
import React, {useEffect, useState} from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import NotFoundArms from "@/components/notFoundArms";
import styles from "@/styles/pages/notFound.module.scss"
import Link from "next/link";
import SupabaseProvider from '@/app/(website)/supabase-provider';

export default async function NotFound() {
  const globalFields = await getGlobalFields();

  return (
    <SupabaseProvider globalFields={globalFields} session={null} user={null} profile={null}>
      <div className="colorWrapper" style={{
        "--color": "#E3E3E3",
        "--bgColor": "#060606",
      } as React.CSSProperties}>
        <Navigation globalFields={globalFields} />
        <section className={styles.notFound}>
          <NotFoundArms />
          <h1>404 – Wires Disconnected</h1>
          <Link href={"/"} className={`${styles.btn} btn square`}>Return home</Link>
        </section>
        <Footer globalFields={globalFields} />
      </div>
    </SupabaseProvider>
  )
}
