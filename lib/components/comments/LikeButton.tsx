// lib/components/comments/LikeButton.tsx
import {invokeVote, invokeGuestVote} from "@/lib/components/comments/VoteButtons";
import {useComments} from "@/lib/hooks/use-comments";
import {useSupabase} from "@/app/(website)/supabase-provider";
import {CommentType} from "@/lib/utils/types";
import React from "react";

import styles from "@/components/_styles/comments.module.scss";

const LikeButton = (): JSX.Element => {

  const {supabase, user} = useSupabase();
  const {rootComment, mutateRootComment} = useComments();

  async function handleVote(): Promise<void> {

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

  async function handleGuestVote(): Promise<void> {
    if (!rootComment || !rootComment.id) return;

    // Check if the user has already voted as a guest (using local storage)
    const hasVotedAsGuest = localStorage.getItem(`guestVote_${rootComment.id}`);

    if (!hasVotedAsGuest) {
      // Increment votes for the UI
      mutateRootComment((data: CommentType) => ({
        ...data,
        votes: (rootComment.votes || 0) + 1,
        userVoteValue: 1,
      }));

      // Simulate storing the guest vote in the database
      const guestUserId = generateRandomId();
      localStorage.setItem(`guestVote_${rootComment.id}`, guestUserId);

      // Make API call to add/update vote for the guest user using their generated ID
      await invokeGuestVote(supabase, rootComment.id, guestUserId, 1);
    }
  }

  // Function to generate a random ID for the guest user
  function generateRandomId(): string {
    return Math.random().toString(36).slice(2, 11);
  }

  return (
    <>
      {user ? (
        <button
          className={`${styles.topButton} btn square`}
          onClick={handleVote}
          aria-label={`Like comment by ${rootComment?.author.full_name}`}
        >
          <span className="ml-1">
            {rootComment ? rootComment.votes : `-`} <strong>Likes</strong>
          </span>
        </button>
      ) : (
        <button
          className={`${styles.topButton} btn square`}
          onClick={handleGuestVote}
          aria-label={`Like comment by ${rootComment?.author.full_name} as guest`}
        >
          <span className="ml-1">
            {rootComment ? rootComment.votes : `-`} <strong>Like</strong>
          </span>
        </button>
      )}
    </>
  );
};

export default LikeButton;
