import {invokeVote} from "@/components/comments/VoteButtons";
import {useComments} from "@/lib/hooks/useComments";
import {useSupabase} from "@/app/(website)/supabase-provider";
import {CommentType} from "@/lib/utils/types";
import { v4 } from "uuid";
import React from "react";

import styles from "@/components/_styles/comments.module.scss";

const HeartButton = (): JSX.Element => {
  const {supabase, user} = useSupabase();
  const {rootComment, mutateRootComment, redirectToSignIn} = useComments();

  async function handleVote(): Promise<void> {
    if (!user) return createGuestVote();
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

  async function createGuestVote(): Promise<void> {
    var guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = v4();
      localStorage.setItem("guestId", guestId);
    }
    if (!rootComment || !rootComment.id) return;

    if (rootComment.userVoteValue === 0) {
      mutateRootComment((data: CommentType) => ({
        ...data,
        votes: (rootComment.votes || 0) + 1,
        userVoteValue: 1,
      }));
      await invokeGuestVote(supabase, rootComment.id, guestId, 1);
    } else {
      mutateRootComment((data: CommentType) => ({
        ...data,
        votes: (rootComment.votes || 0) - 1,
        userVoteValue: 0,
      }));
      await invokeGuestVote(supabase, rootComment.id, guestId, 0);
    }
  }

  async function invokeGuestVote(
    supabase: any,
    postId: number,
    guestId: string,
    value: number,
  ): Promise<any> {
    return supabase
      .from("votes")
      .upsert([{postId, guestid: guestId, isguest: true, value}])
      .then(({data, error}) => {
        if (error) {
          console.error(error);
          throw error;
        }
        return data;
      });
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
