import {useComments} from "@/lib/hooks/useComments";
import {useSupabase} from "@/app/(website)/supabase-provider";
import Heart from "@/components/icons/Heart";
import type {CommentType} from "@/lib/utils/types";
import cn from "classnames";
import React from "react";
import styles from "@/components/_styles/comments.module.scss";

type StatusType = "upvoted" | "unvoted" | "downvoted";

export async function invokeVote(
  supabase: any,
  postId: number,
  userId: string,
  value: number,
): Promise<any> {
  return supabase
    .from("votes")
    .upsert([{postId, userId, value}])
    .then(({data, error}) => {
      if (error) {
        console.error(error);
        throw error;
      }

      return data;
    });
}

export const mutateVotes = async (
  mutate: any,
  postId: number,
  incrementBy: number,
  userVoteValue: number,
) => {};

function resolveStatus(userVoteValue: number | undefined | null): StatusType {
  if (userVoteValue === 1) return "upvoted";
  if (userVoteValue === -1) return "downvoted";
  return "unvoted";
}

interface Props {
  comment: CommentType;
  config?: {
    type?: "heart" | "thumbs";
    canDownvote?: boolean;
  };
}

const VoteButtons = ({
  comment,
  config = {type: "thumbs", canDownvote: true},
}: Props): JSX.Element | null => {
  const {supabase, user} = useSupabase();
  const {mutateComments, redirectToSignIn} = useComments();
  const status = resolveStatus(comment.userVoteValue);

  async function handleUpvote(): Promise<any> {
    if (!user || !user.id) return redirectToSignIn();

    if (status === "unvoted") {
      await invokeVote(supabase, comment.id, user.id, 1);
      await mutateComments();
    } else if (status === "upvoted") {
      await invokeVote(supabase, comment.id, user.id, 0);
      await mutateComments();
    } else if (status === "downvoted") {
      await invokeVote(supabase, comment.id, user.id, 1);
      await mutateComments();
    }
  }

  function handleDownvote(): void {
    if (!user || !user.id) return redirectToSignIn();

    if (status === "unvoted") {
      invokeVote(supabase, comment.id, user.id, -1);
      mutateVotes(mutateComments, comment.id, -1, -1);
    } else if (status === "upvoted") {
      invokeVote(supabase, comment.id, user.id, -1);
      mutateVotes(mutateComments, comment.id, -2, -1);
    } else if (status === "downvoted") {
      invokeVote(supabase, comment.id, user.id, 0);
      mutateVotes(mutateComments, comment.id, 1, 0);
    }
  }

  if (!comment) return null;

  return (
    <>
      {config.type === "heart" ? (
        <button
          className="text-xs flex items-center focus-ring p-1"
          onClick={handleUpvote}
          aria-label="Like this comment">
          <Heart
            className={cn("w-4 h-4", {
              "text-red-600 fill-current": status === "upvoted",
              "stroke-1.5": status !== "upvoted",
            })}
          />
          <span className="ml-1 text-gray-600 dark:text-gray-400 tabular-nums">
            {comment.votes}
          </span>
        </button>
      ) : (
        <>
          <button
            className={`${styles.likeButton}`}
            onClick={handleUpvote}
            aria-label="Like this comment">
            Like {!!comment.votes && `(${comment.votes})`}
          </button>
        </>
      )}
    </>
  );
};

export default VoteButtons;
