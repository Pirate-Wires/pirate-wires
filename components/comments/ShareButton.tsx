import React from "react";

import styles from "@/components/_styles/comments.module.scss";

const ShareButton = (): JSX.Element => {
  return (
    <button className={`${styles.topButton} btn square`} aria-label="Share comments">
      <span className="ml-1">
        <strong>Share</strong>
      </span>
    </button>
  );
};

export default ShareButton;
