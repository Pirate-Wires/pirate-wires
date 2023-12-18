import NewCommentForm from "@/components/comments/NewCommentForm";
import Plus from "@/components/icons/Plus";
import {useSupabase} from "@/app/(website)/supabase-provider";
import type {CommentType} from "@/lib/utils/types";
import cn from "classnames";
import dayjs from "dayjs";
import {useEffect, useRef, useState} from "react";
import VoteButtons from "./VoteButtons";
import styles from "@/components/_styles/comments.module.scss";
const MAX_LINES = 10;
const LINE_HEIGHT = 24; // in px
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT;

interface ReplyFormProps {
  comment: CommentType;
  handleResetCallback: () => void;
}

const ReplyForm = ({
  comment,
  handleResetCallback,
}: ReplyFormProps): JSX.Element => {
  const [hidden, setHidden] = useState<boolean>(false);
  return (
    <NewCommentForm
      // className={cn({ hidden })}
      parentId={comment.id}
      autofocus={true}
      handleResetCallback={handleResetCallback}
      hideEarlyCallback={() => setHidden(true)}
    />
  );
};

interface Props {
  comment: CommentType;
  pageIndex?: number;
  highlight?: boolean;
  parent?: CommentType | null;
}

const Comment = ({
  comment,
  pageIndex,
  highlight = false,
  parent = null,
}: Props): JSX.Element => {
  const [hidden, setHidden] = useState(false);
  const [isOverflowExpanded, setIsOverflowExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isAdmin = false;
  const {supabase} = useSupabase();

  useEffect(() => {
    if (contentRef && contentRef.current) {
      const el = contentRef.current;

      if (el.scrollHeight > MAX_HEIGHT) {
        setIsOverflow(true);
      }
    }
  }, []);

  async function handleDelete() {
    const {data} = await supabase
      .from("posts")
      .update({
        isDeleted: true,
        content: "[Deleted]",
        title: "[Deleted]",
      })
      .eq("id", comment.id);
    // mutateComments(comment.mutateKey);
  }

  async function handleApprove() {
    const {data} = await supabase
      .from("posts")
      .update({
        isApproved: true,
      })
      .eq("id", comment.id);
    // mutateComments(comment.mutateKey);
  }

  async function handleDeny() {
    const {data} = await supabase
      .from("posts")
      .update({
        isPublished: false,
        isApproved: false,
      })
      .eq("id", comment.id);
    // mutateComments(comment.mutateKey);
  }

  async function handleBan(): Promise<void> {
    return;
  }

  async function handlePin(): Promise<void> {
    return;
  }

  return (
    <>
      {!hidden && parent && (
        <div className="grid pb-1 gap-x-2 comment-grid">
          <div className="w-6 relative">
            <div className="col-start-1 border-gray-200 border-t-2 border-l-2 rounded-tl box-border absolute -right-1 bottom-0 w-2/3 h-1/2" />
          </div>
          <div className="col-start-2 flex items-center leading-none mb-1 transform translate-y-1">
            <button
              className="text-xs text-gray-500 hover:underline focus-ring active:underline cursor-pointer focus:outline-none"
              aria-label={`View comment by ${parent.author?.full_name}`}>
              @{parent.author?.full_name}:
            </button>
            <div className="text-xs text-gray-500 ml-1 hover:text-gray-400 focus-ring active:text-gray-400 cursor-pointer focus:outline-none line-clamp-1">
              {parent.content}
            </div>
          </div>
        </div>
      )}
      <div
        className={cn(`${styles.threadWrapper}`, {
          "opacity-60": !comment.live,
        })}>
        {highlight && (
          <>
            <div className="row-start-1 col-start-1 row-end-3 col-end-3 -m-1 opacity-5 bg-indigo-700 dark:bg-indigo-50 dark:border-gray-100 rounded shadow-2xl pointer-events-none" />
          </>
        )}
        {!hidden ? (
          <>
            <button
              className={cn(`${styles.collapseBtn}`, hidden)}
              onClick={() => setHidden(true)}
              aria-label={`Collapse comment by ${comment.author}`}></button>
          </>
        ) : (
          <button
            onClick={() => setHidden(false)}
            className={styles.expandBtn}
            aria-label={`Expand comment by ${comment.author}`}>
            <Plus />
          </button>
        )}
        <div className={cn(`${styles.commentWrapper}`, hidden)}>
          <div className={styles.nameRow}>
            <span
              className={cn(`${styles.name}`, {
                "text-sm font-medium": !hidden,
                "text-xs": hidden,
              })}>
              {!comment.isDeleted ? comment.author?.full_name : <>[Deleted]</>}{" "}
            </span>
            <span className={styles.postedDate} suppressHydrationWarning>
              {dayjs().diff(comment.createdAt, "seconds", true) < 30
                ? "just now"
                : dayjs(comment.createdAt).fromNow()}
            </span>
            {isAdmin && (
              <button
                className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400 focus-ring border-none ml-5 leading-none"
                onClick={handlePin}
                aria-label={`Pin comment by ${comment.author?.full_name}`}>
                Pin comment
              </button>
            )}
          </div>

          <div className={cn({hidden})}>
            <div
              className={cn(`${styles.comment}`, {
                "line-clamp-10": !isOverflowExpanded,
              })}
              ref={contentRef}>
              {comment.content}
            </div>
            {isOverflow && (
              <button
                className={styles.readMoreLess}
                onClick={() => setIsOverflowExpanded(!isOverflowExpanded)}
                aria-label={isOverflowExpanded ? `Show less` : `Show more`}>
                {isOverflowExpanded ? (
                  <span>Show less</span>
                ) : (
                  <span>Read more</span>
                )}
              </button>
            )}
          </div>
          {!comment.isDeleted && (
            <div className={cn(`${styles.likeReplyButton}`, {hidden})}>
              <VoteButtons comment={comment} />
              <button
                className="text-xs flex items-center text-gray-600 dark:text-gray-400 focus-ring border-none"
                onClick={() => setShowReplyForm(!showReplyForm)}
                aria-label={
                  showReplyForm
                    ? `Hide reply form`
                    : `Reply to comment by ${comment.author?.full_name}`
                }>
                {showReplyForm ? (
                  <>Cancel</>
                ) : (
                  <>
                    Reply{" "}
                    {!!comment.responses.length &&
                      `(${comment.responses.length})`}
                  </>
                )}
              </button>
              {isAdmin && (
                <>
                  {!comment.isApproved && (
                    <button
                      className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400 focus-ring border-none"
                      onClick={handleApprove}
                      aria-label={`Approve comment by ${comment.author?.full_name}`}>
                      Approve
                    </button>
                  )}
                  {comment.isApproved && (
                    <button
                      className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400 focus-ring border-none"
                      onClick={handleDeny}
                      aria-label={`Unapprove comment by ${comment.author?.full_name}`}>
                      Unapprove
                    </button>
                  )}
                  <button
                    className="text-xs text-red-600 flex flex-row items-center focus-ring border-none"
                    onClick={handleDelete}
                    aria-label={`Delete comment by ${comment.author?.full_name}`}>
                    Delete
                  </button>
                  <button
                    className="text-xs text-red-600 flex flex-row items-center focus-ring border-none whitespace-nowrap"
                    onClick={handleBan}
                    aria-label={`Ban ${comment.author?.full_name}`}>
                    Ban user
                  </button>
                </>
              )}
            </div>
          )}

          <div className={cn({hidden})}>
            {showReplyForm && (
              <ReplyForm
                comment={comment}
                handleResetCallback={() => setShowReplyForm(false)}
              />
            )}

            {comment.responses.length > 0 && (
              <div className={`${styles.childComment}`}>
                {comment.responses.map((comment: CommentType) => (
                  <Comment
                    key={comment.slug}
                    comment={comment}
                    pageIndex={pageIndex}
                    highlight={comment.highlight}
                  />
                ))}
              </div>
            )}
          </div>

          {comment.continueThread && comment.responses?.length === 0 && (
            <div className="flex items-center">
              <button
                className={cn(
                  "mt-5 text-xs inline-flex items-center text-gray-600 focus-ring border border-transparent",
                  {hidden},
                )}
                aria-label={`Continue thread`}>
                <div className="h-px w-8 bg-gray-400 dark:bg-gray-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  {`View ${comment.responsesCount === 1 ? "reply" : "replies"
                    } (${comment.responsesCount})`}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
