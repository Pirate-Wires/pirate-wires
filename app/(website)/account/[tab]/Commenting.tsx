import Button from "@/components/ui/Button";
import styles from "@/styles/pages/account.module.scss";

export const Commenting = ({
  handleSubmitCommentsDisplayName,
  updateCommentsNotifications,
  userDetails,
}) => {
  return (
    <>
      <div className={styles.infoGroup}>
        <form
          id="commentsDisplayNameForm"
          onSubmit={handleSubmitCommentsDisplayName}>
          <label>Comments username</label>
          <input
            type="text"
            name="commentsDisplayName"
            className={styles.textInput}
            defaultValue={userDetails?.comments_display_name ?? ""}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
        <Button variant="slim" type="submit" form="commentsDisplayNameForm">
          Save
        </Button>
      </div>
      <div className={styles.checkboxRow}>
        <label htmlFor="toggle">
          <input
            type="checkbox"
            id="toggle"
            checked={userDetails?.comments_notifications || false}
            onChange={() => {
              // Toggle the comments_notifications value and update
              updateCommentsNotifications(!userDetails?.comments_notifications);
            }}
          />
          Email me when someone replies to my comments
        </label>
      </div>
    </>
  );
};

export default Commenting;
