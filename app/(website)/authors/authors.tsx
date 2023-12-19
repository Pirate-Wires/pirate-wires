import Link from "next/link";
import AuthorTile from "@/components/authorTile";
import styles from "../../../styles/pages/authors.module.scss";
export default function Authors({ pageData }) {
  const writers = pageData.author_list.filter(author => author.position === "core");
  const contributors = pageData.author_list.filter(author => author.position === "contributor");
  return (
    <section className={`${styles.authorsPage} c-20`}>
      <h1 className={`pageTitle pb-40`}>
        {pageData.title}{" "}
        <Link className={styles.hiringLink} href="/careers">
          (We’re hiring btw)
        </Link>
      </h1>
      <div className="postGrid">
        {writers.map((author: any) => (
          <AuthorTile key={author.name} authorData={author} />
        ))}
        <div className="dummyTile"></div>
        <div className="dummyTile"></div>
      </div>

      <div className={styles.contributorsGrid}>
        <h2 className={styles.contributorsHeader}>Contributors</h2>
        {contributors.map(author => (
          <Link key={author.name} href={`/author/${author.slug.current}`}>
            {author.name}
          </Link>
        ))}
        <div className="dummyTile"></div>
        <div className="dummyTile"></div>
      </div>
    </section>
  );
}
