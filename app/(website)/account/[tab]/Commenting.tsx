import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import styles from "@/styles/pages/account.module.scss";

import { Toast, ToastUtil, ToastableError } from "@/components/ui/Toast";

export const Commenting = ({ updateCommentsDisplayName, updateCommentsNotifications, profile }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdatedDisplayName, setLastUpdatedDisplayName] = useState(profile?.comments_display_name ?? "");
  const [notification, setNotification] = useState<boolean>(profile.comments_notifications);
  const [detailUpdateMsg, setDetailUpdateMsg] = useState("");
  const [error, setError] = useState<ToastableError | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (isLoading) {
      ToastUtil.showLoadingToast();
    } else {
      ToastUtil.dismissToast();
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      ToastUtil.showErrorToast(error);
    }
  }, [error]);

  useEffect(() => {
    if (successMsg) {
      ToastUtil.showSuccessToast(successMsg);
    }
  }, [successMsg]);

  const handleSubmitCommentsDisplayName = async event => {
    event.preventDefault();
    setDetailUpdateMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const newDisplayName = formData.get("commentsDisplayName") as string; // Updated key

      if (newDisplayName.length < 3) {
        setDetailUpdateMsg(`3 char display name required`);
        setIsLoading(false);
        throw new ToastableError(`3 char  display name required`);
        return; // Stop the submission process
      }

      if (newDisplayName === lastUpdatedDisplayName) {
        setDetailUpdateMsg(`Different display name required`);
        setIsLoading(false);
        throw new ToastableError(`Different display name required`);
        return;
      }

      await updateCommentsDisplayName(formData);

      setLastUpdatedDisplayName(newDisplayName);
      setDetailUpdateMsg(`Comments display name updated successfully`);
      setIsLoading(false);
      setSuccessMsg(`Comment display name updated`);
      setTimeout(() => {
        setDetailUpdateMsg("");
      }, 3000);
    } catch (error) {
      console.error(`Error updating comments display name: ${error.message}`);
      setDetailUpdateMsg(error.message);
      setError(new ToastableError(error.message));
    }
  };

  const handleToggleCommentsNotifications = async event => {
    event.preventDefault();

    const newNotification = event.target.checked;

    setIsLoading(true);
    setSuccessMsg("");
    await updateCommentsNotifications(newNotification);
    setNotification(newNotification);
    setIsLoading(false);
    setSuccessMsg("Comment notifications updated");
  };

  return (
    <>
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
      <Toast />
    </>
  );
};

export default Commenting;
