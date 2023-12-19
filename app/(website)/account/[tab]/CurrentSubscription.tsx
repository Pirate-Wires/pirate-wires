import moment from "moment";
import styles from "@/styles/pages/account.module.scss";

export const CurrentSubscription = ({ subscription }) => {
  const formatTrialEnd = trialEnd => {
    if (!trialEnd || !moment(trialEnd).isValid()) {
      return "Not specified";
    }
    return moment(trialEnd).format("MMM D, YYYY");
  };

  const hasTrial = subscription.trial_end && moment(subscription.trial_end).isValid();

  const currentPeriodStart = moment(subscription.current_period_start);
  const currentPeriodEnd = moment(subscription.current_period_end);
  const remainingDays = currentPeriodEnd.diff(currentPeriodStart, 'days');

  const currentPeriodStart = moment(subscription.current_period_start);
  const currentPeriodEnd = moment(subscription.current_period_end);
  const remainingDays = currentPeriodEnd.diff(currentPeriodStart, 'days');

  return (
    <div className={styles.subscriptionWrapper}>
      <h1>Subscription & billing</h1>

      {subscription.status === "active" && (
        <>
          <p>Your subscription is currently active.</p>
          {subscription.cancel_at_period_end ? (
            <p>This plan will cancel after the current period ends on {formatTrialEnd(subscription.current_period_end)}.</p>
          ): (
            <p>After the current period ends on {formatTrialEnd(subscription.current_period_end)} this plan will continue automatically.</p>
          )}
        </>
      )}

      {hasTrial && (
        <>
          <p>You have {remainingDays} days left on your trial subscription.</p>
          {subscription.cancel_at_period_end ? (
            <p>This plan will cancel after the free trial ends on {formatTrialEnd(subscription.trial_end)}.</p>
          ): (
            <p>After your free trial ends on {formatTrialEnd(subscription.trial_end)} this plan will continue automatically.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentSubscription;
