// /app/(website)/account/accountUI.tsx
"use client";
import Link from "next/link";
import {notFound, useRouter} from "next/navigation";
import styles from "@/styles/pages/account.module.scss";
import React, {useState, useEffect, useMemo} from "react";
import TabButton from "./TabButtons";
import MyDetails from "./MyDetails";
import EmailPreferences from "./EmailPreferences";
import Commenting from "./Commenting";
import CurrentSubscription from "./CurrentSubscription";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

export default function AccountUI({
  tab,
  userDetails,
  subscription,
  session,
  updateName,
  updateEmail,
  updateCommentsNotifications,
  updateCommentsDisplayName,
}) {
  const router = useRouter();
  const user = session?.user;
  const tabItems = useMemo(
    () => [
      "my-details",
      "email-preferences",
      "commenting",
      "subscription-billing",
    ],
    [],
  );
  const [tabVisibility, setActiveTab] = useState([true, false, false, false]);
  const [detailUpdateMsg, setDetailUpdateMsg] = useState("");
  const [lastUpdatedName, setLastUpdatedName] = useState(
    userDetails?.full_name ?? "",
  );
  const [lastUpdatedDisplayName, setLastUpdatedDisplayName] = useState(
    userDetails?.comments_display_name ?? "",
  );
  const [lastUpdatedEmail, setLastUpdatedEmail] = useState(
    user ? user.email : "",
  );

  useEffect(() => {
    const tabStatus: boolean[] = new Array(tabItems.length).fill(false);
    const tabIndex = tabItems.indexOf(tab);
    if (tabIndex === -1) return notFound();
    tabStatus[tabIndex] = true;
    setActiveTab(tabStatus);
  }, [tab, tabItems]);

  const updateActiveTab = (idx: number) => {
    router.push(`/account/${tabItems[idx]}`);
  };

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

      await updateName(formData);

      setLastUpdatedName(newName);
      setDetailUpdateMsg(`User name updated successfully`);
      setTimeout(() => {
        setDetailUpdateMsg("");
      }, 3000);
    } catch (error) {
      console.error(`Error updating name: ${error.message}`);
      setDetailUpdateMsg(error.message);
    }
  };

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

      await updateEmail(formData);

      setLastUpdatedEmail(newEmail);
      setDetailUpdateMsg(`User email updated successfully`);
    } catch (error) {
      console.error(`Error updating email: ${error.message}`);
      setDetailUpdateMsg(error.message);
    }
  };

  const handleToggleCommentsNotifications = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "comments_notifications",
      String(!userDetails?.comments_notifications),
    );
    await updateCommentsNotifications(formData);
  };

  return (
    <section className="accountContainer c-20">
      <div className={styles.top} data-name={userDetails?.full_name}>
        <h1>
          {userDetails?.full_name && userDetails?.full_name !== ""
            ? userDetails?.full_name
            : "Account"}
        </h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <TabButton updateActiveTab={updateActiveTab} />
        </div>

        <div className={`${styles.right}`}>
          <div
            className={`${styles.cardWrapper} ${
              tabVisibility[0] ? styles.activeCard : ""
            } user-details`}>
            {!!detailUpdateMsg && (
              <h2 className={styles.tag}>{detailUpdateMsg}</h2>
            )}
            <MyDetails
              handleSubmitName={handleSubmitName}
              handleSubmitEmail={handleSubmitEmail}
              userDetails={userDetails}
            />
          </div>
          <div
            className={`${styles.cardWrapper} ${
              tabVisibility[1] ? styles.activeCard : ""
            } email-preferences`}>
            <EmailPreferences user={user} />
          </div>
          <div
            className={`${styles.cardWrapper} ${
              tabVisibility[2] ? styles.activeCard : ""
            } email-notifictation-preferences`}>
            <Commenting
              handleSubmitCommentsDisplayName={handleSubmitCommentsDisplayName}
              updateCommentsNotifications={updateCommentsNotifications}
              userDetails={userDetails}
            />
          </div>

          <div
            className={`${styles.cardWrapper} ${
              tabVisibility[3] ? styles.activeCard : ""
            } subscription`}>
            {userDetails?.subscription_id ? (
              <>
                <CurrentSubscription subscription={subscription} />
                <hr />
                <ManageSubscriptionButton session={session} />
              </>
            ) : (
              <>
                <p>Not subscribed yet</p>
                <Link
                  href="/subscribe"
                  className={`${styles.subscriptionBtn} btn`}>
                  Subscribe
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
