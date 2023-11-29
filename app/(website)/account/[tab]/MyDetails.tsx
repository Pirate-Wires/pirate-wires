import Button from "@/components/ui/Button";
import styles from "@/styles/pages/account.module.scss";

export const MyDetails = ({
  handleSubmitName,
  handleSubmitEmail,
  userDetails,
}) => {
  return (
    <>
      <div className={styles.infoGroup}>
        <form id="nameForm" onSubmit={handleSubmitName}>
          <label>Full name</label>
          <input
            type="text"
            name="name"
            className={styles.textInput}
            defaultValue={userDetails?.full_name ?? ""}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
        <Button variant="slim" type="submit" form="nameForm">
          Update Name
        </Button>
      </div>

      <div className={`${styles.infoGroup}`}>
        <form id="emailForm" onSubmit={handleSubmitEmail}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            defaultValue={userDetails?.email ?? ""}
            className={styles.textInput}
            placeholder="Your email"
            maxLength={64}
          />
        </form>
        <Button variant="slim" type="submit" form="emailForm">
          Update Email
        </Button>
      </div>
      <div className={`${styles.infoGroup} ${styles.textGroup}`}>
        <p className={styles.pseudoLabel}>Need help?</p>
        <p>
          Send an email to{" "}
          <a href="mailto:support@piratewires.com" title="Send us an email">
            support@piratewires.com
          </a>{" "}
          and we’ll help you out
        </p>
      </div>
    </>
  );
};

export default MyDetails;
