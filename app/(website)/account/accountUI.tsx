// /app/(website)/account/accountUI.tsx
'use client';
import styles from "@/styles/pages/account.module.scss"
import SignOutButton from "@/components/ui/Navbar/SignOutButton";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { EmailPreferences } from "./EmailPreferences";
import CurrentSubscription from "./CurrentSubscription";

export default function AccountUI(
  {
    userDetails,
    subscription,
    session,
    updateName,
    updateEmail,
    updateCommentsNotifications

  }) {
  const [tabVisibility, setActiveTab] = useState([true, false, false, false]);
  const updateActiveTab = (idx: number) => {
    const newArr: boolean[] = [];
    for (let i = 0; i < tabVisibility.length; i++) {
      if (idx === i) {
        newArr.push(true);
      } else {
        newArr.push(false);
      }
    }
    setActiveTab(newArr);
  };

  const user = session?.user;

  const handleSubmitName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await updateName(formData);
  };

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await updateEmail(formData);
  };

  const handleToggleCommentsNotifications = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('comments_notifications', String(!userDetails?.comments_notifications));
    await updateCommentsNotifications(formData);
  };




  return (
    <section className="accountContainer c-20">
      <div className={styles.top} data-name={userDetails?.full_name}>
        <h1>{(userDetails?.full_name && userDetails?.full_name !== "") ? userDetails?.full_name : 'Account'}</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <button className={`${styles.cardTrigger}`} onClick={() => { updateActiveTab(0) }}>My details</button>
          <button className={`${styles.cardTrigger}`} onClick={() => { updateActiveTab(1) }}>Email preferences</button>
          <button className={`${styles.cardTrigger}`} onClick={() => { updateActiveTab(2) }}>Commenting</button>
          <button className={`${styles.cardTrigger}`} onClick={() => { updateActiveTab(3) }}>Subscription & billing</button>
          <SignOutButton />
        </div>

        <div className={`${styles.right}`}>
          <div className={`${styles.cardWrapper} ${tabVisibility[0] ? styles.activeCard : ""} user-details`}>
            <div className={styles.infoGroup}>
              <form id="nameForm" onSubmit={handleSubmitName}>
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-xs outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
                  defaultValue={userDetails?.full_name ?? ''}
                  placeholder="Your name"
                  maxLength={64}
                />
              </form>
              <Button
                variant="slim"
                type="submit"
                form="nameForm"
              >
                Update Name
              </Button>
            </div>


            <div className={`${styles.infoGroup}`}>
              <form id="emailForm" onSubmit={handleSubmitEmail}>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={user ? user.email : ''}
                  placeholder="Your email"
                  maxLength={64}
                />
              </form>
              <Button
                variant="slim"
                type="submit"
                form="emailForm"
              >
                Update Email
              </Button>
            </div>
            <div className={`${styles.infoGroup} ${styles.textGroup}`}>
              <p className={styles.pseudoLabel}>Need help?</p>
              <p>Send an email to support@piratewires.com and we’ll help you out</p>
            </div>
          </div>
          <div className={`${styles.cardWrapper} ${tabVisibility[1] ? styles.activeCard : ""} email-preferences`}>

            <EmailPreferences user={user} />

          </div>
          <div className={`${styles.cardWrapper} ${tabVisibility[2] ? styles.activeCard : ""} email-notifictation-preferences`}>
            <label>
              <input
                type="checkbox"
                checked={userDetails?.comments_notifications || false}
                onChange={() => {
                  // Toggle the comments_notifications value and update
                  updateCommentsNotifications(!userDetails?.comments_notifications);
                }}
              />
              Receive email notifications for comments
            </label>
          </div>

          <div className={`${styles.cardWrapper} ${tabVisibility[3] ? styles.activeCard : ""} subscription`}>

            <div className={styles.infoGroup}>
              Subscription & Billing
              {/* stripe account link */}
            </div>

            {userDetails?.subscription_id ? (
              <CurrentSubscription subscription={subscription} />
            ) : (
              <h2>Not subscribed yet</h2>
            )
            }
          </div>


        </div>
      </div>
    </section>
  );
}
