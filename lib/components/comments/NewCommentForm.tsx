// import { useSignInModal } from '@/lib/components/comments/SignInModal';
import SignInModal from '@/lib/components/comments/SignInModal';
import User from '@/lib/icons/User';
import updateFieldHeight from '@/lib/utils/autosize';
import supabase from '@/lib/utils/initSupabase';
import punctuationRegex from '@/lib/utils/regex/punctuationRegex';
import { CommentType } from '@/lib/utils/types';
import { useUser } from '@/lib/hooks/use-user';
import cn from 'classnames';
import cuid from 'cuid';
import React, { useRef, useState, useEffect } from 'react';
import NewUserModal from '@/lib/components/comments/NewUserModal';
import { useComments } from '@/lib/hooks/use-comments';
import Avatar from './Avatar';
import { useModal } from '@/lib/hooks/use-modal';

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
  const { open, isOpen } = useModal({ signInModal: SignInModal, newUserModal: NewUserModal });

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
      }, false);

      handleReset();
      handleResetCallback?.();
    }
  }

  return (
    <>
      <div className="">
        <div className="">
          {!user && (
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
          )}

          <label className="">
            <span className="sr-only">Enter a comment</span>
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
              className={cn(
                {
                  'disabled': content.length < 1 || isLoading,
                }
              )}
              disabled={content.length < 1}
              onClick={handleSubmit}
              aria-label="Submit new post"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCommentForm;
