import { invokeVote } from '@/lib/components/comments/VoteButtons';
import { useComments } from '@/lib/hooks/use-comments';
import { useModal } from '@/lib/hooks/use-modal';
import { useSupabase } from '@/app/(website)/supabase-provider';
import Heart from '@/lib/icons/Heart';
import { CommentType } from '@/lib/utils/types';
import cn from 'classnames';
import React from 'react';

const HeartButton = (): JSX.Element => {
  const { user } = useSupabase();
  const { rootComment, mutateRootComment } = useComments();
  const { open } = useModal();

  async function handleVote(): Promise<void> {
    if (!user) return open('signInModal');
    if (!rootComment || !rootComment.id) return;

    if (rootComment.userVoteValue === 0) {
      mutateRootComment(
        (data: CommentType) => ({ ...data, votes: (rootComment.votes || 0) + 1, userVoteValue: 1 }),
        false
      );
      await invokeVote(rootComment.id, user.id, 1);
    } else {
      mutateRootComment(
        (data: CommentType) => ({ ...data, votes: (rootComment.votes || 0) - 1, userVoteValue: 0 }),
        false
      );
      await invokeVote(rootComment.id, user.id, 0);
    }
  }

  return (
    <button
      className=""
      onClick={handleVote}
      aria-label={`Like comment by ${rootComment?.author.full_name}`}
    >
      <Heart
        className={cn('w-6 h-6 stroke-1.5', {
          'text-red-600 fill-current': rootComment?.userVoteValue === 1,
        })}
      />
      <span className="ml-1 tabular-nums min-w-[12px]">
        {rootComment ? rootComment.votes : `-`}
      </span>
    </button>
  );
};

export default HeartButton;
