"use client";
import CommentsList from '@/lib/supabase-comments/components/comments/CommentsList';
import NewCommentForm from '@/lib/supabase-comments/components/comments/NewCommentForm';
import { useComments } from '@/lib/supabase-comments/hooks/use-comments';
import { CommentType } from '@/lib/supabase-comments/utils/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime, {
  rounding: Math.floor,
});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

interface Props {
  initialData?: CommentType | null;
}

const CommentSection = ({ initialData = null }: Props): JSX.Element => {

  console.log('initialData', initialData);

  const { count } = useComments();

  return (
    <>
      <div className="flex-none flex flex-row items-center justify-between py-3 sm:py-4 px-3 sm:px-6 order-first">
        <h2 className="text-xl font-semibold dark:text-gray-100">
          Comments {count && <span>({count})</span>}
        </h2>
      </div>

      <div className="flex border border-gray-200 px-3 sm:px-6">
        comment form
        <NewCommentForm />
      </div>

      <div className="flex-grow flex flex-col overflow-hidden border px-3 sm:px-6">
        comment list
        <CommentsList initialData={initialData} useInfiniteScroll={false} />
      </div>
    </>
  );
};

export default CommentSection;
