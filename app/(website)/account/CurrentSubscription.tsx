import moment from 'moment';

export const CurrentSubscription = ({ subscription }) => {
  const formatTrialEnd = (trialEnd) => {
    if (!trialEnd || !moment(trialEnd).isValid()) {
      return 'Not specified';
    }
    return moment(trialEnd).format('MMM DD');
  };

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


      {/* if we want to show information about the trial period, we can use the following code. days remaining for example */}
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
