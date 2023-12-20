import Link from "next/link";
import styles from "@/components/_styles/fixedOverlay.module.scss";

const FixedOverlay = () => {
  return (
    <div className={styles.container}>
      <h1>Continue Reading With a Free Trial</h1>
      <p>Get access to all our articles and newsletters from Pirate Wires, The White Pill & The Industry</p>
      <Link href="/subscribe">Subscribe Now – 14 Days Free Trial </Link>
      <div className="signIn">
        <div>
          <p>Already have an account?</p>
        </div>
        <Link href="/sign-in">
          <p className={styles.underline}>Sign In</p>
        </Link>
      </div>
    </div>
  );
};

export default FixedOverlay;
