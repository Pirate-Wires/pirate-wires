import PostList from "@/components/postlist";
import Link from "next/link";
import styles from "./_styles/relatedArticles.module.scss"

export default function RelatedArticles({ relatedArticles }) {
  return (
    <section className={`${styles.relatedPosts} c-20 ptb-40`}>
      <h5 className={`mb-40`}>Related articles</h5>
      <div className={`postGrid`}>
        {relatedArticles.map(post => (
          // @ts-ignore
          <PostList
            key={post.title}
            post={post}
            aspect="landscape"
            preloadImage={true}
          />
        ))}
      </div>
    </section>

  );
}