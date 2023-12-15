"use client";

import CommentSection from "@/components/comments/CommentSection";
import LikeButton from "@/components/comments/LikeButton";
import CommentsCountButton from "@/components/comments/CommentsCountButton";
import ShareButton from "@/components/comments/ShareButton";
import {CommentsContextProvider} from "@/hooks/useComments";

import styles from "@/components/_styles/comments.module.scss";

export default function Comment({postId}): JSX.Element {
  return (
    <CommentsContextProvider postId={postId}>
      <section className={`${styles.commentsSection}`}>
        <div className={`${styles.commentsTop} pb-20`}>
          <div className={`${styles.buttonGroup}`}>
            <LikeButton />
            <CommentsCountButton />
          </div>
          <div className={`${styles.buttonGroup}`}>
            <ShareButton />
          </div>
        </div>
        <CommentSection />
      </section>
    </CommentsContextProvider>
  );
}
