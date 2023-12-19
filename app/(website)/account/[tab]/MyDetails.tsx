import React, { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import { Toast, ToastUtil, ToastableError } from "@/components/ui/Toast";

import styles from "@/styles/pages/account.module.scss";
import { set } from "sanity";

export const MyDetails = ({ userDetails, setUserName }) => {
  const [lastUpdatedName, setLastUpdatedName] = useState(userDetails?.full_name ?? "");
  const [lastUpdatedEmail, setLastUpdatedEmail] = useState(userDetails?.email ?? "");
  const [successMsg, setSuccessMsg] = useState("");
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
    if (successMsg) {
      ToastUtil.showSuccessToast(successMsg);
    }
  }, [successMsg]);

  useEffect(() => {
    if (error) {
      ToastUtil.showErrorToast(error);
    }
  }, [error]);

  const handleSubmitName = async event => {
    event.preventDefault();
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const newName = formData.get("name") as string;
      if (newName === lastUpdatedName) {
        setIsLoading(false);
        throw new ToastableError("Updated name is the same");
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
        const data = await response.json();
        throw new ToastableError(data.message, response.status);
      }

      const {
        user_metadata: { full_name: updatedName },
      } = await response.json();

      setUserName(updatedName);
      setLastUpdatedName(updatedName);
      setIsLoading(false);
      setSuccessMsg("Successfully updated user name");
    } catch (error) {
      console.error(`Error updating name: ${error.message}`);
      setIsLoading(false);
      setError(error);
    }
  };

  const handleSubmitEmail = async event => {
    event.preventDefault();
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const newEmail = formData.get("email") as string;
      if (newEmail === lastUpdatedEmail) {
        setIsLoading(false);
        throw new ToastableError("Updated email is the same");
      }

      const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({
          id: userDetails?.id!,
          email: newEmail,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new ToastableError(data.message, response.status);
      }

      setLastUpdatedEmail(newEmail);
      setIsLoading(false);
      setSuccessMsg("Successfully updated user email");
    } catch (error) {
      console.error(`Error updating email: ${error.message}`);
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <>
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
          Update name
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
          Update email
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
