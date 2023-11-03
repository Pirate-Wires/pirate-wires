// import { useSignInModal } from '../..//components/comments/SignInModal';
import SignInModal from '../..//components/comments/SignInModal';
import User from '../..//icons/User';
import updateFieldHeight from '../..//utils/autosize';
import supabase from '../..//utils/initSupabase';
import punctuationRegex from '../..//utils/regex/punctuationRegex';
import { CommentType } from '../..//utils/types';
import { useUser } from '../..//hooks/use-user';
import cn from 'classnames';
import cuid from 'cuid';
import React, { useRef, useState, useEffect } from 'react';
import NewUserModal from '../..//components/comments/NewUserModal';
import { useComments } from '../..//hooks/use-comments';
import Avatar from './Avatar';

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
  const { user, profile } = useUser();
  const { mutateGlobalCount, rootId, mutateComments } = useComments();

  useEffect(() => {
    if (user && profile && (!profile.full_name || !profile.username)) {
      open('newUserModal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile]);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (autofocus) {
      if (textareaRef && textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [autofocus]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setContent(e.target.value);
    if (textareaRef?.current) {
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

    mutateGlobalCount((count: number) => count + 1, false);

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
    }, false);

    const { data, error } = await supabase.from('posts').insert([post]);

    if (error) {
      console.log(error);
    } else {
      mutateComments(async (staleResponses: CommentType[]) => {
        const newResponse = ({
          ...data?.[0],
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
      }, false);

      handleReset();
      handleResetCallback?.();
    }
  }

  return (
    <>
      {!user && (
        <button
          onClick={() => open('signInModal')}
          aria-label="Create new account"
        >Sign in to leave a comment</button>
      )}

      <textarea
        placeholder="Write a comment..."
        rows={1}
        value={content}
        onChange={handleChange}
        ref={textareaRef}
        disabled={isLoading}
      ></textarea>

      <button
        disabled={content.length < 1}
        onClick={handleSubmit}
        aria-label="Submit new post"
      >
        Post
      </button>
    </>
  );
};

export default NewCommentForm;
