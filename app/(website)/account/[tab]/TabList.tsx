import Link from "next/link";
import SignOutButton from "@/components/ui/Navbar/SignOutButton";
import styles from "@/styles/pages/account.module.scss";

export const TabList = () => {
  return (
    <>
      <Link href="/account/my-details" className={`${styles.cardTrigger}`}>
        My details
      </Link>
      <Link href="/account/newsletter-preferences" className={`${styles.cardTrigger}`}>
        Newsletter preferences
      </Link>
      <Link href="/account/commenting" className={`${styles.cardTrigger}`}>
        Commenting
      </Link>
      <Link href="/account/subscription-billing" className={`${styles.cardTrigger}`}>
        Subscription & billing
      </Link>
      <SignOutButton />
    </>
  );
};

export default TabList;
