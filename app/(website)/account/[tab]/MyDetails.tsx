import React, { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import {Toast, ToastUtil, ToastableError} from "@/components/ui/Toast";

import styles from "@/styles/pages/account.module.scss";
import { set } from "sanity";

export const MyDetails = ({ userDetails, setUserName }) => {
  const [lastUpdatedName, setLastUpdatedName] = useState(userDetails?.full_name ?? "");
  const [lastUpdatedEmail, setLastUpdatedEmail] = useState(userDetails?.email ?? "");
  const [detailUpdateMsg, setDetailUpdateMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ToastableError | null>(null);

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

  const handleSubmitName = async event => {
    event.preventDefault();
    setDetailUpdateMsg("");
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const newName = formData.get("name") as string;
      if (newName === lastUpdatedName) {
        setDetailUpdateMsg(`Different name required`);
        return;
      }

      const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({
          id: userDetails?.id!,
          full_name: newName,
        }),
        next: { tags: [userDetails?.id!] },
      });

      if (!response.ok) {
        throw new ToastableError("Error could not update name", response.status);
      }

      const {
        user_metadata: { full_name: updatedName },
      } = await response.json();

      setUserName(updatedName);
      setLastUpdatedName(updatedName);
      setDetailUpdateMsg(`User name updated successfully`);
      setTimeout(() => {
        setDetailUpdateMsg("");
      }, 3000);
      setIsLoading(false);
      ToastUtil.showSuccessToast("Successfully updated user name");
    } catch (error) {
      console.error(`Error updating name: ${error.message}`);
      setDetailUpdateMsg(error.message);
      setIsLoading(false);
      setError(error);
    }
  };

  const handleSubmitEmail = async event => {
    event.preventDefault();
    setDetailUpdateMsg("");
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const newEmail = formData.get("email") as string;
      if (newEmail === lastUpdatedEmail) {
        setDetailUpdateMsg(`Different email required`);
        return;
      }

      const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({
          id: userDetails?.id!,
          email: newEmail,
        }),
      });

      if (!response.ok) {
        throw new ToastableError("Error updating user email", response.status);
      }

      setLastUpdatedEmail(newEmail);
      setDetailUpdateMsg(`User email updated successfully`);
      setIsLoading(false);
      ToastUtil.showSuccessToast("Successfully updated user email");
    } catch (error) {
      console.error(`Error updating email: ${error.message}`);
      setDetailUpdateMsg(error.message);
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <>
      {!!detailUpdateMsg && <h2 className={styles.tag}>{detailUpdateMsg}</h2>}
      <div className={styles.infoGroup}>
        <form id="nameForm" onSubmit={handleSubmitName}>
          <label>Full name</label>
          <input
            type="text"
            name="name"
            className={styles.textInput}
            defaultValue={userDetails?.full_name ?? ""}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
        <Button variant="slim" type="submit" form="nameForm">
          Update Name
        </Button>
      </div>

      <div className={`${styles.infoGroup}`}>
        <form id="emailForm" onSubmit={handleSubmitEmail}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            defaultValue={userDetails?.email ?? ""}
            className={styles.textInput}
            placeholder="Your email"
            maxLength={64}
          />
        </form>
        <Button variant="slim" type="submit" form="emailForm">
          Update Email
        </Button>
      </div>
      <div className={`${styles.infoGroup} ${styles.textGroup}`}>
        <p className={styles.pseudoLabel}>Need help?</p>
        <p>
          Send an email to{" "}
          <a href="mailto:support@piratewires.com" title="Send us an email">
            support@piratewires.com
          </a>{" "}
          and we’ll help you out
        </p>
      </div>
      <Toast />
    </>
  );
};

export default MyDetails;
