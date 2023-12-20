import Link from "next/link";
import styles from "@/components/_styles/stickyOverlay.module.scss";

interface StickyOverlayProps {
  count: number;
}

const StickyOverlay: React.FC<StickyOverlayProps> = ({ count }) => {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.remainCount}>{3 - count} Free Articles Left This Month</p>
        <p className={styles.description}>Start your 14 day free trial for unilimited access</p>
      </div>
      <Link href="/subscribe">Subscribe</Link>
    </div>
  );
};

export default StickyOverlay;
