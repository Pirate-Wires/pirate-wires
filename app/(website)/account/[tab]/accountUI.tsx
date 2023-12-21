// /app/(website)/account/accountUI.tsx
"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import styles from "@/styles/pages/account.module.scss";
import React, { useState, useEffect, useMemo } from "react";
import TabButton from "./TabList";
import MyDetails from "./MyDetails";
import NewsletterPreferences from "./NewsletterPreferences";
import Commenting from "./Commenting";
import CurrentSubscription from "./CurrentSubscription";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

export default function AccountUI({
  tab,
  userDetails,
  subscription,
  session,
  profile,
  updateCommentsNotifications,
  updateCommentsDisplayName,
}) {
  const router = useRouter();
  const tabItems = useMemo(() => ["my-details", "newsletter-preferences", "commenting", "subscription-billing"], []);
  const [tabVisibility, setActiveTab] = useState([true, false, false, false]);
  const [userName, setUserName] = useState(userDetails?.full_name ?? "Account");

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

  return (
    <section className="accountContainer c-20">
      <div className={styles.top} data-name={userDetails?.full_name}>
        <h1>{userName}</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <TabButton />
        </div>

        <div className={`${styles.right}`}>
          <div className={`${styles.cardWrapper} ${tabVisibility[0] ? styles.activeCard : ""} user-details`}>
            <MyDetails userDetails={userDetails} setUserName={setUserName} />
          </div>
          <div className={`${styles.cardWrapper} ${tabVisibility[1] ? styles.activeCard : ""} newsletter-preferences`}>
            <NewsletterPreferences user={userDetails} />
          </div>
          <div
            className={`${styles.cardWrapper} ${
              tabVisibility[2] ? styles.activeCard : ""
            } email-notifictation-preferences`}>
            <Commenting
              updateCommentsDisplayName={updateCommentsDisplayName}
              updateCommentsNotifications={updateCommentsNotifications}
              profile={profile}
            />
          </div>

          <div className={`${styles.cardWrapper} ${tabVisibility[3] ? styles.activeCard : ""} subscription`}>
            {userDetails?.subscription_id ? (
              <>
                <CurrentSubscription subscription={subscription} />
                <ManageSubscriptionButton session={session} />
              </>
            ) : (
              <>
                <p>Not subscribed yet</p>
                <Link href="/subscribe" className={`${styles.subscriptionBtn} btn`}>
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
