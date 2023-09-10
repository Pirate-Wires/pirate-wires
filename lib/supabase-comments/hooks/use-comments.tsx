// lib/supabase-comments/hooks/use-comments.tsx
"use client"
import { PAGE_SIZE } from '@/lib/supabase-comments/constants/pagination';
import { useUser } from '@/lib/supabase-comments/hooks/use-user';
import { definitions } from '@/lib/supabase-comments/types/supabase';
import supabase from '@/lib/supabase-comments/utils/initSupabase';
import type { CommentType, User } from '@/lib/supabase-comments/utils/types';
import { arrayToTree } from 'performant-array-to-tree';
import { createContext, useContext, useState } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

export type SortingBehavior = 'pathVotesRecent' | 'pathLeastRecent' | 'pathMostRecent';

interface CommentsContextInterface {
  postId: number | null;
  user: User | null;
  rootComment: CommentType | null | undefined;
  comments: CommentType[];
  rootId: number | null;
  count: number | null | undefined;
  remainingCount: number | null;
  error: any;
  commentsError: any;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean;
  isEmpty: boolean;
  isReachingEnd: boolean | undefined;
  loadMore: () => void;
  mutateComments: any;
  mutateGlobalCount: any;
  mutateRootComment: any;
  sortingBehavior: SortingBehavior;
  setSortingBehavior: (behavior: SortingBehavior) => void;
  setSize: (size: number | ((size: number) => number)) => Promise<any[] | undefined | null> | null;
}

const CommentsContext = createContext<CommentsContextInterface>({
  postId: null,
  user: null,
  rootComment: null,
  comments: [],
  rootId: null,
  count: null,
  remainingCount: null,
  error: null,
  commentsError: null,
  isLoadingInitialData: false,
  isLoadingMore: false,
  isEmpty: true,
  isReachingEnd: true,
  loadMore: () => {
    return;
  },
  mutateComments: null,
  mutateGlobalCount: null,
  mutateRootComment: null,
  sortingBehavior: 'pathVotesRecent',
  setSortingBehavior: () => {
    return;
  },
  setSize: () => {
    return null;
  },
});

interface CommentsContextProviderProps {
  postId: number | null;
  [propName: string]: any;
}

const postgresArray = (arr: any[]): string => `{${arr.join(',')}}`;

export const CommentsContextProvider = (props: CommentsContextProviderProps): JSX.Element => {
  const { postId } = props;
  const { user } = useUser();
  const [sortingBehavior, setSortingBehavior] = useState<SortingBehavior>('pathVotesRecent');

  const { data: count, mutate: mutateGlobalCount, error: commentsError } = useSWR<
    number | null,
    any
  >(`globalCount_${postId}`, {
    fetcher: () => null,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  const { data: rootComment, mutate: mutateRootComment } = useSWR<CommentType | null, any>(
    ['posts', `${postId}`, user],
    async (_, postId, _user) => {
      console.log('getKey postId:', postId);
      const { data, error } = await supabase
        .from<definitions['comments_thread_with_user_vote']>('comments_thread_with_user_vote')
        .select('*')
        .eq('id', postId);

      if (error) {
        console.log(error);
        throw error;
      }

      if (!data?.[0]) return null;

      return data[0] as CommentType;
    }
  );

  const getKey = (
    pageIndex: number,
    previousPageData: CommentType[],
    postId: number | null,
    sortingBehavior: SortingBehavior,
    user: User | null
  ): [string, string, SortingBehavior, User | null] | null => {
    console.log('getKey postId:', postId);
    if (!postId) return null;

    if (previousPageData && !previousPageData.length) return null;

    if (pageIndex === 0) {
      return ['comments_thread_with_user_vote', postgresArray([`${postId}`]), sortingBehavior, user];
    }
    return [
      'comments_thread_with_user_vote',
      postgresArray(previousPageData[previousPageData.length - 1][sortingBehavior]),
      sortingBehavior,
      user,
    ];
  };

  // fuck
  // fix this useSWRInfinite code



  const { data, error, size, setSize, mutate: mutateComments } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, postId, sortingBehavior, user),
    async (_, path, sortingBehavior, _user) => {
      console.log('fetching', path, sortingBehavior);
      console.log('path', path);

      const { data, error, count: tableCount } = await supabase
        .from<definitions['comments_thread_with_user_vote']>('comments_thread_with_user_vote')
        .select('*', { count: 'exact' })
        .contains('path', [postId])
        .gt(sortingBehavior, path)
        .order(sortingBehavior as any)
        .limit(PAGE_SIZE);

      if (error) throw error;
      if (!data) return null;
      mutateGlobalCount((count) => {
        if (count) return count;
        return tableCount;
      }, false);

      return data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  const flattenedComments: CommentType[] = data ? data.flat() : [];

  const rootParentIds = flattenedComments
    .filter((comment: CommentType) => comment.parentId === postId)
    .map((comment: CommentType) => comment.parentId)
    .reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue]: true,
      }),
      {}
    );

  const comments: CommentType[] = data
    ? (arrayToTree(flattenedComments, {
      dataField: null,
      childrenField: 'responses',
      rootParentIds,
    }) as CommentType[])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || !!(size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = !data || data?.[0]?.length === 0;
  const remainingCount = !count || isEmpty ? 0 : count - flattenedComments.length;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  function loadMore(): void {
    if (isLoadingMore || isReachingEnd) return;
    setSize(size + 1);
  }

  const value = {
    postId,
    user,
    comments,
    rootComment,
    commentsError,
    rootId: postId,
    count,
    remainingCount,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore,
    mutateComments,
    mutateGlobalCount,
    mutateRootComment,
    sortingBehavior,
    setSortingBehavior,
    setSize,
  };

  return <CommentsContext.Provider value={value} {...props} />;
};

export function useComments(): CommentsContextInterface {
  const context = useContext(CommentsContext);

  if (context === undefined) {
    throw new Error(`useComments must be used within a CommentsContextProvider.`);
  }

  return context;
}
