import Link from "next/link";
import styles from "@/styles/pages/account.module.scss";

export default function NotSubscriptionStatus() {
  return (
    <>
      <p>Not subscribed yet</p>
      <Link href="/subscribe" className={`${styles.subscriptionBtn} btn`}>
        Subscribe
      </Link>
    </>
  );
}
