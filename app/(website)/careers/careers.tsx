"use client";
import Link from "next/link";
import styles from "../../../styles/pages/careers.module.scss";
import { useDateFormatter } from "@/lib/hooks/useDateFormatter";
import { useScrollBasedAnims } from "@/lib/hooks/useScrollBasedAnims";
import CareerItem from "./careerItem";
export default function Authors({ pageData }) {
  useScrollBasedAnims();
  return (
    <section className={`${styles.careersPage} c-20`}>
      <h1 className={`pageTitle pb-40`}>{pageData.title}</h1>
      <div className={`${styles.careersGrid}`}>
        {pageData.career_list.map(career => (
          <CareerItem key={career.title} career={career} />
        ))}
      </div>
      <div className={`${styles.openCasting} ptb-40`}>
        <h4>
          Don’t see a job opening that fits you?
          <br /> Send us an email at <a href="mailto:careers@piratewires.com">careers@piratewires.com</a>
        </h4>
      </div>
    </section>
  );
}
