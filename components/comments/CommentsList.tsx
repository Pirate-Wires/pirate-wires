import Comment from "@/components/comments/Comment";
import CommentSkeleton from "@/components/comments/CommentSkeleton";
import {SCROLL_OFFSET_PX} from "@/lib/constants/pagination";
import {useComments} from "@/hooks/useComments";
import {CommentType} from "@/lib/utils/types";
import cn from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, {useRef, useState} from "react";
import styles from "@/components/_styles/comments.module.scss";

dayjs.extend(relativeTime, {
  rounding: Math.floor,
});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

interface Props {
  initialData?: CommentType | null;
}

const CommentsList = ({initialData = null}: Props): JSX.Element => {
  const {
    rootComment,
    comments,
    remainingCount,
    count,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore,
    error,
    commentsError,
  } = useComments();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  function handleScroll(): void {
    if (wrapperRef.current && wrapperRef.current.scrollTop === 0) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }

    if (
      wrapperRef.current &&
      contentRef.current &&
      wrapperRef.current.scrollTop +
      wrapperRef.current.offsetHeight +
      SCROLL_OFFSET_PX >
      contentRef.current.offsetHeight
    ) {
      loadMore();
    }
  }

  if (error || commentsError) {
    console.error(error);
    return <div className={styles.errorMessage}>An error occurred.</div>;
  }

  if (!isLoadingInitialData && !rootComment) {
    return <div className={styles.errorMessage}>Post not found.</div>;
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("", {
        "shadow-inner": isScrolled,
      })}>
      <div ref={contentRef}>
        {/* <SortCommentsSelect /> */}
        {isLoadingInitialData &&
          Array.from(new Array(3)).map((_, index) => (
            <CommentSkeleton key={`comments_skeleton_${index}`} />
          ))}
        {!isLoadingInitialData && (
          <>
            {comments.map((comment: CommentType) => (
              <div className={styles.commentList} key={`${comment.slug}`}>
                <Comment comment={comment} highlight={comment.highlight} />
              </div>
            ))}
            {error && (
              <div className={styles.errorMessage}>
                Couldn&apos;t load comments. Please refresh the page.
              </div>
            )}
            {isLoadingMore && <CommentSkeleton />}

            {!isReachingEnd && !!remainingCount && (
              <div className={`${styles.moreButtonWrapper}`}>
                <button
                  onClick={() => loadMore()}
                  className={`${styles.moreButton}`}
                  disabled={isLoadingMore}
                  aria-label={`Load ${remainingCount} more replies`}>
                  {remainingCount} more replies
                </button>
              </div>
            )}

            {isEmpty && (
              <div className={styles.noCommentsMessage}>
                There are no comments yet. Be the first!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
