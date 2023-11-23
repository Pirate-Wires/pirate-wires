// import { useSignInModal } from '@/lib/components/comments/SignInModal';
import SignInModal from '@/lib/components/comments/SignInModal';
import User from '@/lib/icons/User';
import updateFieldHeight from '@/lib/utils/autosize';
// import supabase from '@/lib/utils/initSupabase';
import punctuationRegex from '@/lib/utils/regex/punctuationRegex';
import { CommentType } from '@/lib/utils/types';
import { useSupabase } from '@/app/(website)/supabase-provider';
import cn from 'classnames';
import cuid from 'cuid';
import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import NewUserModal from '@/lib/components/comments/NewUserModal';
import { useComments } from '@/lib/hooks/use-comments';
import Avatar from './Avatar';
import { useModal } from '@/lib/hooks/use-modal';

import styles from "@/components/_styles/comments.module.scss";

// Placeholder function for modal handling
const open = (modalName: string): void => {
  // Implement modal handling logic here or do something else
  console.log(`Opening ${modalName} modal`);
};

interface Props {
  parentId?: number | null;
  autofocus?: boolean;
  handleResetCallback?: () => void;
  hideEarlyCallback?: () => void;
}

const NewCommentForm = ({
  parentId = null,
  autofocus = false,
  handleResetCallback,
  hideEarlyCallback,
}: Props): JSX.Element => {
  const [content, setContent] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { supabase, user, profile } = useSupabase();
  const { mutateGlobalCount, rootId, mutateComments } = useComments();

  useEffect(() => {
    if (autofocus && textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autofocus]);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setContent(e.target.value);
    if (textareaRef && textareaRef.current) {
      updateFieldHeight(textareaRef.current);
    }
  }

  function handleReset(): void {
    setContent('');
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'initial';
    }
    setIsLoading(false);
  }

  async function handleSubmit(): Promise<void> {
    setIsLoading(true);
    hideEarlyCallback?.();

    if (!user) {
      return open('signInModal');
    }

    if (!profile) {
      return open('newUserModal');
    }

    const postString = content
      .toString()
      .substring(0, 77)
      .replace(punctuationRegex, '')
      .replace(/(\r\n|\n|\r)/gm, '')
      .split(' ')
      .filter((str) => str !== '')
      .join('-')
      .toLowerCase();

    const slug = `${postString}-${cuid.slug()}`;

    const post = {
      authorId: user?.id,
      content: content,
      parentId: parentId ?? rootId,
      slug,
    };

    mutateGlobalCount((count: number) => count + 1);

    mutateComments(async (pages: CommentType[]) => {
      const optimisticResponse: CommentType = ({
        ...post,
        author: profile,
        highlight: true,
        live: false,
        createdAt: new Date().toISOString(),
        id: null,
        title: null,
        isPublished: false,
        votes: 0,
        upvotes: 0,
        downvotes: 0,
        userVoteValue: 0,
      } as unknown) as CommentType;

      const newData = [optimisticResponse, ...pages];

      return newData;
    });

    const { data, error } = await supabase.from('posts').insert([post]);

    if (error) {
      console.log(error);
    } else {
      mutateComments(async (staleResponses: CommentType[]) => {
        const newResponse = ({
          ...(data?.[0] ?? {}),
          author: profile,
          responses: [],
          responsesCount: 0,
          highlight: true,
          votes: 0,
          upvotes: 0,
          downvotes: 0,
          userVoteValue: 0,
        } as unknown) as CommentType;

        const filteredResponses = staleResponses.filter(
          (response) => response.slug !== newResponse.slug
        );

        const newData = [[newResponse], ...filteredResponses];

        return newData;
      });

      handleReset();
      handleResetCallback?.();
    }
  }

  return (
    <>
      <div className="">
        <div className={`${styles.newCommentForm}`}>
          {/* {!user && (
            <button
              className=""
              onClick={() => open('signInModal')}
              aria-label="Create new account"
            >
              <User className="" />
            </button>
          )}
          {user && (
            <button className="" aria-label="View profile information">
              <Avatar profile={profile} />
            </button>
          )} */}

          <label className="">
            <textarea
              className=""
              placeholder="Write a comment..."
              rows={1}
              value={content}
              onChange={handleChange}
              ref={textareaRef}
              disabled={isLoading}
            ></textarea>
          </label>

          <div className="">
            <button
              className={`${styles.sendButton}`}
              disabled={content.length < 1}
              onClick={handleSubmit}
              aria-label="Submit new post"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCommentForm;
