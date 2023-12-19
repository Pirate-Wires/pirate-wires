"use client";

import PostList from "@/components/postlist";
import { searchquery } from "@/lib/sanity/groq";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/pages/search.module.scss";
import { getSearchResults } from "@/lib/sanity/client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Toast, ToastUtil, ToastableError } from "@/components/ui/Toast";

export default function Search({ posts }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";
  const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR(query, getSearchResults);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(false);
    if (error) {
      ToastUtil.showErrorToast(new ToastableError(error.message));
    }
  }, [error]);

  const handleChange = e => {
    router.replace(`/search?q=${e.target.value}`);
    setIsLoading(true);
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
          isLoading ? (
            <p className={`${styles.resultsText}`}>Searching...</p>
          ) : (
            <p className={`${styles.resultsText}`}>
              Showing {data?.length > 0 ? data?.length : 0} results for {query}.
            </p>
          )
        ) : (
          <p className={`${styles.resultsText}`}>Showing the latest 12 posts.</p>
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
          {data && data.map((post, index) => <PostList key={index} post={post} aspect="landscape" />)}
        </div>
      )}
      <Toast />
    </section>
  );
}
