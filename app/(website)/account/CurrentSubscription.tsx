import moment from 'moment';

export const CurrentSubscription = ({ subscription }) => {
  const formatTrialEnd = (trialEnd) => {
    if (!trialEnd || !moment(trialEnd).isValid()) {
      return 'Not specified';
    }
    return moment(trialEnd).format('MMM DD');
  };

  console.log('subscription', subscription);

  const hasTrial = subscription.trial_end && moment(subscription.trial_end).isValid();

  return (
    <div>
      <h1>{`$${subscription.prices.unit_amount / 100} / ${subscription.prices.interval}`}</h1>

      <label>Created:</label>
      <p>{`${moment(subscription.created).format('MM/DD/YYYY hh:mm A')}`}</p>

      <label>Current Period:</label>
      <p>{`${moment(subscription.current_period_start).format('MMM DD')} to ${moment(
        subscription.current_period_end
      ).format('MMM DD')}`}</p>

      {subscription.status === 'active' && (
        <>
          <label>Status:</label>
          <p>Active</p>
        </>
      )}

      {subscription.cancel_at_period_end && (
        <>
          <label>Cancel at Period End:</label>
          <p>True</p>
        </>
      )}

      {hasTrial && (
        <>
          <label>Trialing until:</label>
          <p>{formatTrialEnd(subscription.trial_end)}</p>
        </>
      )}
    </div>
  );
};

export default CurrentSubscription;
