import React from 'react';

import MessageBubble from '@/lib/icons/MessageBubble';
import { useComments } from '@/lib/hooks/use-comments';

import styles from "@/components/_styles/comments.module.scss";

const MessageBubbleButton = (): JSX.Element => {
  const { count } = useComments();
  return (
    <button className={`${styles.topButton}`} aria-label="View comments">
      {/* <a
        href="#comments"
        className=""
      > */}
        <span className="ml-1">{count ? count : `-`} <strong>Comments</strong></span>
      {/* </a> */}
    </button>
  );
};

export default MessageBubbleButton;
