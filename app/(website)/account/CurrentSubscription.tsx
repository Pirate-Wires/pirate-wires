import moment from 'moment';
import Link from 'next/link';

export const CurrentSubscription = ({ subscription }) => {
  const formatTrialEnd = (trialEnd) => {
    if (!trialEnd || !moment(trialEnd).isValid()) {
      return 'Not specified';
    }
    return moment(trialEnd).format('MMM DD');
  };

  console.log(subscription);

  return (
    <div>
      <h1>{`$${subscription.prices.unit_amount / 100} / ${subscription.prices.interval}`}</h1>

      <label>Created:</label>
      <p>{`${moment(subscription.created).format('MM/DD/YYYY hh:mm A')}`}</p>

      <label>Current Period:</label>
      <p>{`${moment(subscription.current_period_start).format('MMM DD')} to ${moment(
        subscription.current_period_end
      ).format('MMM DD')}`}</p>

      <label>Trialing until:</label>
      <p>{formatTrialEnd(subscription.trial_end)}</p>
      <hr />
      <Link href="https://billing.stripe.com/p/login/dR6bJqdpI4GH0ZqfYY">Customer Portal Link --&gt;</Link>
    </div>
  );
};

export default CurrentSubscription;
