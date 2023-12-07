import React, { useState } from "react";

import Button from "@/components/ui/Button";
import styles from "@/styles/pages/account.module.scss";

export const MyDetails = ({ userDetails, setUserName }) => {
  const [lastUpdatedName, setLastUpdatedName] = useState(userDetails?.full_name ?? "");
  const [lastUpdatedEmail, setLastUpdatedEmail] = useState(userDetails?.email ?? "");
  const [detailUpdateMsg, setDetailUpdateMsg] = useState("");

  const handleSubmitName = async event => {
    event.preventDefault();
    setDetailUpdateMsg("");

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
        throw new Error(`HTTP error! Status: ${response.status}`);
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
    } catch (error) {
      console.error(`Error updating name: ${error.message}`);
      setDetailUpdateMsg(error.message);
    }
  };

  const handleSubmitEmail = async event => {
    event.preventDefault();
    setDetailUpdateMsg("");

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setLastUpdatedEmail(newEmail);
      setDetailUpdateMsg(`User email updated successfully`);
    } catch (error) {
      console.error(`Error updating email: ${error.message}`);
      setDetailUpdateMsg(error.message);
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
    </>
  );
};

export default MyDetails;
