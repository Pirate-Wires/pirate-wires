// /app/(website)/account/accountUI.tsx
'use client';
import Link from "next/link";
import styles from "@/styles/pages/account.module.scss"
import SignOutButton from "@/components/ui/Navbar/SignOutButton";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { EmailPreferences } from "./EmailPreferences";
import CurrentSubscription from "./CurrentSubscription";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

export default function AccountUI(
  {
    userDetails,
    subscription,
    session,
    updateName,
    updateEmail,
    updateCommentsNotifications

  }) {
  const user = session?.user;
  const [tabVisibility, setActiveTab] = useState([true, false, false, false]);
  const [detailUpdateMsg, setDetailUpdateMsg] = useState('');
  const [lastUpdatedName, setLastUpdatedName] = useState(userDetails?.full_name ?? '');
  const [lastUpdatedEmail, setLastUpdatedEmail] = useState(user ? user.email : '');
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

  const handleSubmitName = async (event) => {
    event.preventDefault();
    setDetailUpdateMsg('');

    try {
      const formData = new FormData(event.target);
      const newName = formData.get('name') as string;
      if (newName === lastUpdatedName) {
        setDetailUpdateMsg(`Different name required`);
        return;
      }

      await updateName(formData);

      setLastUpdatedName(newName);
      setDetailUpdateMsg(`User name updated successfully`);
      setTimeout(() => {
        setDetailUpdateMsg('');
      }, 3000)
    } catch (error) {
      console.error(`Error updating name: ${error.message}`);
      setDetailUpdateMsg(error.message);
    }
  };

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    setDetailUpdateMsg('');

    try {
      const formData = new FormData(event.target);
      const newEmail = formData.get('email') as string;
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
            {!!detailUpdateMsg && <h2 className={styles.tag}>{detailUpdateMsg}</h2>}
            <div className={styles.infoGroup}>
              <form id="nameForm" onSubmit={handleSubmitName}>
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  className={styles.textInput}
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
                  className={styles.textInput}
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
              <p>Send an email to <a href="mailto:support@piratewires.com" title="Send us an email">support@piratewires.com</a> and we’ll help you out</p>
            </div>
          </div>
          <div className={`${styles.cardWrapper} ${tabVisibility[1] ? styles.activeCard : ""} email-preferences`}>

            <EmailPreferences user={user} />

          </div>
          <div className={`${styles.cardWrapper} ${tabVisibility[2] ? styles.activeCard : ""} email-notifictation-preferences`}>
            <label className={styles.checkboxRow}>
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
              <>
                <CurrentSubscription subscription={subscription} />
                <hr />
                <ManageSubscriptionButton session={session} />
              </>

            ) : (
              <>
                <h2>Not subscribed yet</h2>
                <Link href="/subscribe">Subscribe</Link>
              </>
            )
            }
          </div>


        </div>
      </div>
    </section>
  );
}
