import SignOutButton from "@/components/ui/Navbar/SignOutButton";
import styles from "@/styles/pages/account.module.scss";

export const TabButtons = ({updateActiveTab}) => {
  return (
    <>
      <button
        className={`${styles.cardTrigger}`}
        onClick={() => {
          updateActiveTab(0);
        }}>
        My details
      </button>
      <button
        className={`${styles.cardTrigger}`}
        onClick={() => {
          updateActiveTab(1);
        }}>
        Newsletter preferences
      </button>
      <button
        className={`${styles.cardTrigger}`}
        onClick={() => {
          updateActiveTab(2);
        }}>
        Commenting
      </button>
      <button
        className={`${styles.cardTrigger}`}
        onClick={() => {
          updateActiveTab(3);
        }}>
        Subscription & billing
      </button>
      <SignOutButton />
    </>
  );
};

export default TabButtons;
