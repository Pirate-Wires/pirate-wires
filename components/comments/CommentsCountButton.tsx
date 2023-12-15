import React from "react";
import {useComments} from "@/hooks/useComments";

import styles from "@/components/_styles/comments.module.scss";

const CommentsCount = (): JSX.Element => {
  const {count} = useComments();
  return (
    <button
      className={`${styles.topButton} btn square`}
      aria-label="View comments">
      <span className="ml-1">
        {count !== null ? count : `-`} <strong>Comments</strong>
      </span>
    </button>
  );
};

export default CommentsCount;
