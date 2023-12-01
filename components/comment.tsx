// components/comments.tsx
"use client";

import CommentSection from "@/lib/components/comments/CommentSection";
import MessageBubbleButton from "@/lib/components/comments/MessageBubbleButton";
import LikeButton from "@/lib/components/comments/LikeButton";
import ShareButton from "@/lib/components/comments/ShareButton";
import {CommentsContextProvider} from "@/lib/hooks/use-comments";

// SidebarComments and ModalProvider are not yet required features
// import SidebarComments from "@/lib/components/comments/SidebarComments";
// import { ModalProvider } from '@/lib/hooks/use-modal';


import styles from "@/components/_styles/comments.module.scss";

export default function Comment({postId}): JSX.Element {
  return (
    <CommentsContextProvider postId={postId}>
      <section className={`${styles.commentsSection}`}>
        <div className={`${styles.commentsTop} pb-20`}>
          <div className={`${styles.buttonGroup}`}>
            <LikeButton />
            <MessageBubbleButton />
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
