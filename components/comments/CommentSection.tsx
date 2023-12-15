import CommentsList from "@/components/comments/CommentsList";
import NewCommentForm from "@/components/comments/NewCommentForm";
import {useComments} from "@/hooks/useComments";
import {CommentType} from "@/lib/utils/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import styles from "@/components/_styles/comments.module.scss";
dayjs.extend(relativeTime, {
  rounding: Math.floor,
});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

interface Props {
  initialData?: CommentType | null;
}

const CommentSection = ({initialData = null}: Props): JSX.Element => {
  return (
    <>
      <NewCommentForm />

      <div className="">
        <CommentsList initialData={initialData} />
      </div>
    </>
  );
};

export default CommentSection;
