import React from 'react';

import MessageBubble from '@/lib/icons/MessageBubble';
import { useComments } from '@/lib/hooks/use-comments';

const MessageBubbleButton = (): JSX.Element => {
  const { count } = useComments();
  return (
    <button className="" aria-label="View comments">
      <a
        href="#comments"
        className=""
      >
        <MessageBubble className="w-6 h-6" />
        <span className="ml-1">{count ? count : `-`}</span>
      </a>
    </button>
  );
};

export default MessageBubbleButton;
