import PostList from "@/components/postlist";
import Link from "next/link";
import styles from "./_styles/relatedArticles.module.scss";

export default function RelatedArticles({ relatedArticles }) {
  return (
    <section className={`${styles.relatedPosts} relatedArticles c-20 ptb-40 mt-40`}>
      <h5 className={`mb-40`}>Related articles</h5>
      <div className={`postGrid related`}>
        {relatedArticles.map((post, index) => (
          // @ts-ignore
          <PostList key={index} post={post} aspect="landscape" preloadImage={true} />
        ))}
      </div>
    </section>
  );
}
