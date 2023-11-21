import CommentsList from '@/lib/components/comments/CommentsList';
import NewCommentForm from '@/lib/components/comments/NewCommentForm';
import { useComments } from '@/lib/hooks/use-comments';
import { CommentType } from '@/lib/utils/types';
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
  const { count } = useComments();

  return (
    <>
      <div className="">
        <h2 className="">
          {count && <span>{count}</span>} Comments
        </h2>
      </div>

      <div className="">
        <NewCommentForm />
      </div>

      <div className="">
        <CommentsList initialData={initialData} useInfiniteScroll={false} />
      </div>
    </>
  );
};

export default CommentSection;
