import {useRouter} from "next/navigation";
import {PAGE_SIZE} from "@/lib/constants/pagination";
import {useSupabase} from "@/app/(website)/supabase-provider";
import type {CommentType, User} from "@/lib/utils/types";
import {arrayToTree} from "performant-array-to-tree";
import {createContext, useContext, useState} from "react";
import useSWR, {useSWRInfinite} from "swr";

export type SortingBehavior =
  | "pathVotesRecent"
  | "pathLeastRecent"
  | "pathMostRecent";

interface CommentsContextInterface {
  postId: number | null;
  user: User | null;
  redirectToSignIn: () => void;
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
  setSize: (
    size: number | ((size: number) => number),
  ) => Promise<any[] | undefined | null> | null;
}

const CommentsContext = createContext<CommentsContextInterface>({
  postId: null,
  user: null,
  redirectToSignIn: () => {
    return;
  },
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
  sortingBehavior: "pathVotesRecent",
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

const postgresArray = (arr: any[]): string => `{${arr.join(",")}}`;

export const CommentsContextProvider = (
  props: CommentsContextProviderProps,
): JSX.Element => {
  const router = useRouter();
  const {postId} = props;
  const {supabase, user} = useSupabase();
  const [sortingBehavior, setSortingBehavior] =
    useState<SortingBehavior>("pathVotesRecent");
  const [count, setCount] = useState<number | null>(null);
  const [rootComment, setRootComment] = useState<CommentType | null>(null);

  const {error: commentsError} = useSWR<number | null, any>(
    `globalCount_${postId}`,
    {
      initialData: null,
      fetcher: () => null,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  useSWR(["posts", postId, user], async (_, postId, _user) =>
    supabase
      .from("comments_thread_with_user_vote")
      .select("*")
      .eq("id", postId)
      .then(({data, error}) => {
        if (error) {
          console.error(error);
          throw error;
        }

        if (!data?.[0]) return null;

        setRootComment(data[0] as unknown as CommentType);
        return data[0] as unknown as CommentType;
      }),
  );

  const getKey = (
    pageIndex: number,
    previousPageData: CommentType[],
    postId: number | null,
    sortingBehavior: SortingBehavior,
    user: User | null,
  ): [string, string, SortingBehavior, User | null] | null => {
    if (!postId) return null;
    if (previousPageData && !previousPageData.length) return null;
    if (pageIndex === 0) {
      return [
        "comments_thread_with_user_vote",
        postgresArray([postId]),
        sortingBehavior,
        user,
      ];
    }

    return [
      "comments_thread_with_user_vote",
      postgresArray(
        previousPageData[previousPageData.length - 1][sortingBehavior],
      ),
      sortingBehavior,
      user,
    ];
  };

  const {
    data,
    error,
    size,
    setSize,
    mutate: mutateComments,
  } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, postId, sortingBehavior, user), // Include user to revalidate when auth changes
    async (_name, path, sortingBehavior, _user) => {
      return (
        supabase
          .from("comments_thread_with_user_vote")
          .select("*", {count: "exact"})
          .contains("path", [postId])
          // .lt('depth', MAX_DEPTH)
          .gt(sortingBehavior, path)
          .order(sortingBehavior as any)
          .limit(PAGE_SIZE)
          .then(({data, error, count: tableCount}) => {
            if (error) throw error;
            if (!data) return null;
            setCount(count => {
              if (count) return count;
              return tableCount;
            });

            return data;
          })
      );
    },
    {
      revalidateOnFocus: false,
      // revalidateOnMount: !cache.has(['comments_thread_with_user_vote', postgresArray([postId])]),
    },
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
      {},
    );

  const comments: CommentType[] = data
    ? (arrayToTree(flattenedComments, {
      dataField: null,
      childrenField: "responses",
      rootParentIds,
    }) as CommentType[])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    !!(size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = !data || data?.[0]?.length === 0;
  const remainingCount =
    !count || isEmpty ? 0 : count - flattenedComments.length;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  function loadMore(): void {
    if (isLoadingMore || isReachingEnd) return;
    setSize(size + 1);
  }

  const redirectToSignIn = () => {
    router.push("/sign-in");
  };

  const value = {
    postId,
    user,
    redirectToSignIn,
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
    mutateGlobalCount: setCount,
    mutateRootComment: setRootComment,
    sortingBehavior,
    setSortingBehavior,
    setSize,
  };

  return <CommentsContext.Provider value={value} {...props} />;
};

export function useComments(): CommentsContextInterface {
  const context = useContext(CommentsContext);

  if (context === undefined) {
    throw new Error(
      `useComments must be used within a CommentsContextProvider.`,
    );
  }

  return context;
}
