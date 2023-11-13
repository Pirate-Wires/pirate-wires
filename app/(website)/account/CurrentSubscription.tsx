import moment from 'moment';

export const CurrentSubscription = ({ subscription }) => {
  return (
    <div>
      <h1>{`$${subscription.prices.unit_amount / 100} / ${
        subscription.prices.interval
      }`}</h1>

      <label>Created:</label>
      <p>{`${moment(subscription.created).format('MM/DD/YYYY hh:mm A')}`}</p>

      <label>Current Period:</label>
      <p>{`${moment(subscription.current_period_start).format(
        'MMM DD'
      )} to ${moment(subscription.current_period_end).format('MMM DD')}`}</p>

      <label>Trialing until:</label>
      <p>{`${moment(subscription.trial_end).format('MMM DD')}`}</p>
    </div>
  );
};

export default CurrentSubscription;
