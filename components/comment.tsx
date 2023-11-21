import CommentSection from '@/lib/components/comments/CommentSection';
import SidebarComments from '@/lib/components/comments/SidebarComments';
import MessageBubbleButton from '@/lib/components/comments/MessageBubbleButton';
import HeartButton from '@/lib/components/comments/HeartButton';
import { CommentsContextProvider } from '@/lib/hooks/use-comments';

import styles from "@/components/_styles/comments.module.scss";


export default function Comment(): JSX.Element {
  return (
    <CommentsContextProvider postId={1}>
      {/* <ModalProvider> */}
        <section className={`${styles.commentsSection} c-20`}>
          <div className={`${styles.commentsTop}`}>
            <MessageBubbleButton />
            <HeartButton />
          </div>

          <CommentSection />

          <SidebarComments />
        </section>
      {/* </ModalProvider> */}
    </CommentsContextProvider>
  );
}
