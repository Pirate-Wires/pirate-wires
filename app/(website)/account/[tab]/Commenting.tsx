import React, { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "@/styles/pages/account.module.scss";

import LoadingOverlay from "./LoadingOverlay";

export const Commenting = ({ updateCommentsDisplayName, updateCommentsNotifications, profile }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdatedDisplayName, setLastUpdatedDisplayName] = useState(profile?.comments_display_name ?? "");
  const [notification, setNotification] = useState<boolean>(profile.comments_notifications);
  const [detailUpdateMsg, setDetailUpdateMsg] = useState("");

  const handleSubmitCommentsDisplayName = async event => {
    event.preventDefault();
    setDetailUpdateMsg("");

    try {
      const formData = new FormData(event.target);
      const newDisplayName = formData.get("commentsDisplayName") as string; // Updated key

      if (newDisplayName === lastUpdatedDisplayName) {
        setDetailUpdateMsg(`Different display name required`);
        return;
      }

      await updateCommentsDisplayName(formData);

      setLastUpdatedDisplayName(newDisplayName);
      setDetailUpdateMsg(`Comments display name updated successfully`);
      setTimeout(() => {
        setDetailUpdateMsg("");
      }, 3000);
    } catch (error) {
      console.error(`Error updating comments display name: ${error.message}`);
      setDetailUpdateMsg(error.message);
    }
  };

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
      {!!isLoading && <LoadingOverlay message="Toggling comment reply notification..." />}
      {!!detailUpdateMsg && <h2 className={styles.tag}>{detailUpdateMsg}</h2>}
      <div className={styles.infoGroup}>
        <form id="commentsDisplayNameForm" onSubmit={handleSubmitCommentsDisplayName}>
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
          <input type="checkbox" id="toggle" checked={notification} onChange={handleToggleCommentsNotifications} />
          Email me when someone replies to my comments
        </label>
      </div>
    </>
  );
};

export default Commenting;
