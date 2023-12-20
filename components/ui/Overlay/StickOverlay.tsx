import Link from "next/link";
import { useState } from "react";
import styles from "@/components/_styles/stickyOverlay.module.scss";

interface StickyOverlayProps {
  count: number;
}

const StickyOverlay: React.FC<StickyOverlayProps> = ({ count }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <button className={styles.closeButton} onClick={handleClose}>X</button>
          <div className={styles.bannerContent}>
            <div>
              <p className={styles.remainCount}>{3 - count} Free Articles Left This Month</p>
              <p className={styles.description}>Start your 14 day free trial for unlimited access</p>
            </div>
            <div className={styles.subscribeButton}>
              <Link href="/subscribe">Subscribe</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyOverlay;
