import React, {useState} from "react";
import Button from "@/components/ui/Button";
import styles from "@/styles/pages/account.module.scss";

import LoadingOverlay from "./LoadingOverlay";

export const Commenting = ({
  handleSubmitCommentsDisplayName,
  updateCommentsNotifications,
  profile,
}) => {
  const [notification, setNotification] = useState<boolean>(
    profile.comments_notifications,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleToggleCommentsNotifications = async event => {
    event.preventDefault();

    const newNotification = event.target.checked;

    setIsLoading(true);
    await updateCommentsNotifications(newNotification);
    setNotification(newNotification);
    setIsLoading(false);
  };
  return (
    <>
      {!!isLoading && (
        <LoadingOverlay message="Toggling comment reply notification..." />
      )}
      <div className={styles.infoGroup}>
        <form
          id="commentsDisplayNameForm"
          onSubmit={handleSubmitCommentsDisplayName}>
          <label>Comments username</label>
          <input
            type="text"
            name="commentsDisplayName"
            className={styles.textInput}
            defaultValue={profile?.comments_display_name ?? ""}
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
            checked={notification}
            onChange={handleToggleCommentsNotifications}
          />
          Email me when someone replies to my comments
        </label>
      </div>
    </>
  );
};

export default Commenting;
