"use client";

import PostList from "@/components/postlist";
import { searchquery } from "@/lib/sanity/groq";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import styles from "@/styles/pages/search.module.scss"
import { fetcher } from "@/lib/sanity/client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search({posts}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";
  const [timer, setTimer] = useState( setTimeout(() => {}, 0.01));
  const { data, error } = useSWR(
    [searchquery, { query: query }],
    fetcher
  );

  const handleChange = e => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      router.replace(`/search?q=${e.target.value}`);
    }, 500);
    setTimer(newTimer);
  };

  return (
    <section className={`${styles.searchPage} c-20`}>
      <div className={styles.top}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            defaultValue={query}
            onChange={handleChange}
            placeholder={"Start searching..."}
            name="q"
            id="q"
            className=""
          />
          <MagnifyingGlassIcon />
        </div>
        {query ? (
          <p className={`${styles.resultsText}`}>
            Showing {data?.length} results for {query}.
          </p>
        ) : (
          <p className={`${styles.resultsText}`}>
            Showing the latest 12 posts.
          </p>
        )}
      </div>

      {!query && (
        <div className="postGrid mt-20">
          {posts.slice(0, 12).map((post, index) => (
            <PostList key={index} post={post} aspect="landscape" />
          ))}
        </div>
      )}
      {query && (
        <div className="postGrid mt-20">
          {data &&
            data.map((post, index) => (
              <PostList key={index} post={post} aspect="landscape" />
            ))
          }
        </div>
      )}
    </section>
  );
}
