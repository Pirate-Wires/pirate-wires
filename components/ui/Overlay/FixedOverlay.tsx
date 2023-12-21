import Link from "next/link";
import styles from "@/components/_styles/fixedOverlay.module.scss";

const FixedOverlay = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bannerContent}>
        <svg viewBox="0 0 33 24" fill="none" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.0446548H7.49502C9.19222 0.0446548 10.5249 1.3507 10.5249 3.05861V11.52C10.5249 13.1163 9.19222 14.4558 7.49502 14.4558H3.8842V24H0V0.0446548ZM4.02088 13.92L6.04841 12.4354C6.33317 12.2233 6.48125 11.8995 6.48125 11.587V2.88C6.48125 2.52279 6.33317 2.21024 6.04841 1.99814L4.02088 0.569306C3.95254 0.535818 3.8728 0.569306 3.8728 0.636283V13.8419C3.8842 13.92 3.95254 13.9535 4.02088 13.92Z" fill="white"></path><path d="M32.8505 1.76372C32.8505 2.7014 32.1443 3.28186 31.3014 3.28186C30.4585 3.28186 29.7523 2.7014 29.7523 1.76372C29.7523 0.826048 30.4585 0.245583 31.3014 0.245583C32.1443 0.245583 32.8505 0.826048 32.8505 1.76372ZM32.5657 1.76372C32.5657 0.971164 31.9848 0.491164 31.3128 0.491164C30.6293 0.491164 30.0484 0.971164 30.0484 1.76372C30.0484 2.54512 30.6293 3.03628 31.3128 3.03628C31.9848 3.03628 32.5657 2.54512 32.5657 1.76372ZM31.6545 1.87535L31.9848 2.45582H31.5861L31.3014 1.92H31.1419V2.45582H30.7888V1.0493H31.4153C31.757 1.0493 31.9506 1.21675 31.9506 1.49582C31.9393 1.67442 31.8253 1.80837 31.6545 1.87535ZM31.1419 1.67442H31.3356C31.4836 1.67442 31.5634 1.60744 31.5634 1.49582C31.5634 1.37302 31.4836 1.30605 31.3356 1.30605H31.1419V1.67442Z" fill="white"></path><path d="M28.9207 0V22.5823C28.9207 23.3637 28.2829 23.9888 27.4855 23.9888H24.9682H13.6345C12.8486 23.9888 12.2221 23.3637 12.2221 22.6047V0H16.1746V21.5219C16.1746 21.7116 16.2544 21.9014 16.4025 22.0353L18.5553 23.9777V0H22.5192V21.466C22.5192 21.6558 22.5989 21.8456 22.747 21.9795L24.9682 23.9888V0H28.9207Z" fill="white"></path></svg>
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
  );
};

export default FixedOverlay;
