import {invokeVote} from "@/lib/components/comments/VoteButtons";
import {useComments} from "@/lib/hooks/use-comments";
import {useSupabase} from "@/app/(website)/supabase-provider";
import Heart from "@/lib/icons/Heart";
import {CommentType} from "@/lib/utils/types";
import cn from "classnames";
import React from "react";

import styles from "@/components/_styles/comments.module.scss";

const HeartButton = (): JSX.Element => {
  const {supabase, user} = useSupabase();
  const {rootComment, mutateRootComment, redirectToSignIn} = useComments();

  async function handleVote(): Promise<void> {
    if (!user) return redirectToSignIn();
    if (!rootComment || !rootComment.id) return;

    if (rootComment.userVoteValue === 0) {
      mutateRootComment((data: CommentType) => ({
        ...data,
        votes: (rootComment.votes || 0) + 1,
        userVoteValue: 1,
      }));
      await invokeVote(supabase, rootComment.id, user.id, 1);
    } else {
      mutateRootComment((data: CommentType) => ({
        ...data,
        votes: (rootComment.votes || 0) - 1,
        userVoteValue: 0,
      }));
      await invokeVote(supabase, rootComment.id, user.id, 0);
    }
  }

  return (
    <button
      className={`${styles.topButton} btn square`}
      onClick={handleVote}
      aria-label={`Like comment by ${rootComment?.author.full_name}`}>
      <span className="ml-1">
        {rootComment ? rootComment.votes : `-`} <strong>Likes</strong>
      </span>
    </button>
  );
};

export default HeartButton;
