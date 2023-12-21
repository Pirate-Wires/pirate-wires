import Link from "next/link";
import styles from "@/components/_styles/fixedOverlay.module.scss";
import PirateWiresLogoSVG from "@/components/icons/PirateWiresLogoSVG";

const FixedOverlay = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.bannerContent}>
          <div className={styles.logo}>
            <PirateWiresLogoSVG />
          </div>
          <h1 className={styles.bannerText}>Continue Reading With a Free Trial</h1>
          <p className={styles.bannerSubtext}>Get access to all our articles and newsletters from Pirate Wires, The White Pill & The Industry</p>
          <div className={styles.subscribeButton}>
            <Link href="/subscribe">Subscribe Now – 14 Days Free Trial </Link>
          </div>
          <div className={styles.signInText}>
            <div>
              <p className={styles.signinText}>Already have an account? <Link className={styles.signinLink} href="/sign-in">Sign In</Link>
              </p> 
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gradientContainer}></div>
    </div>
  );
};

export default FixedOverlay;
