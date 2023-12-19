"use client";

import { postData } from "@/lib/utils/helpers";
import styles from "@/styles/pages/account.module.scss";

import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface Props {
  session: Session;
}

export default function ManageSubscriptionButton({ session }: Props) {
  const router = useRouter();
  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await postData({
        url: "/api/create-portal-link",
      });
      router.push(url);
    } catch (error) {
      console.error(error);
      if (error) return alert((error as Error).message);
    }
  };

  return (
    <div className={styles.subscriptionManagement}>
      <p className={styles.subscriptionText}>
        Manage your subscription on Stripe:
      </p>
      <button
        className={styles.subscriptionBtn}
        disabled={!session}
        onClick={redirectToCustomerPortal}>
        Customer Portal
      </button>
    </div>
  );
}
