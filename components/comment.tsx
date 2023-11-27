"use client";

import CommentSection from "@/lib/components/comments/CommentSection";
import SidebarComments from "@/lib/components/comments/SidebarComments";
import MessageBubbleButton from "@/lib/components/comments/MessageBubbleButton";
import HeartButton from "@/lib/components/comments/HeartButton";
import ShareButton from "@/lib/components/comments/ShareButton";
import {CommentsContextProvider} from "@/lib/hooks/use-comments";
// import { ModalProvider } from '@/lib/hooks/use-modal';

import styles from "@/components/_styles/comments.module.scss";

export default function Comment({postId}): JSX.Element {
  return (
    <CommentsContextProvider postId={postId}>
      {/* <ModalProvider> */}
      <section className={`${styles.commentsSection} c-20`}>
        <div className={`${styles.commentsTop} pb-20`}>
          <div className={`${styles.buttonGroup}`}>
            <HeartButton />
            <MessageBubbleButton />
          </div>
          <div className={`${styles.buttonGroup}`}>
            <ShareButton />
          </div>
        </div>

        <CommentSection />

        {/* <SidebarComments /> */}
      </section>
      {/* </ModalProvider> */}
    </CommentsContextProvider>
  );
}
