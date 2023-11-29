import React, {useEffect, useState} from "react";
import moment from "moment";
import styles from "@/styles/pages/subscribe.module.scss";
const MONTHLY_PRICE = process.env.NEXT_PUBLIC_SUBSCRIBE_MONTHLY_PRICE;
const EXPIRES_MONTH = process.env.NEXT_PUBLIC_SUBSCRIBE_EXPIRES_MONTH;
const TRIAL_PERIOD_DAYS = process.env.NEXT_PUBLIC_SUBSCRIBE_TRIAL_PERIOD_DAYS;

const SubscriptionPlan = () => {
  const [expireDateStr, setExpireDateStr] = useState("");

  useEffect(() => {
    const updateFormattedDate = () => {
      const expireDate = moment()
        .add(TRIAL_PERIOD_DAYS, "days")
        .add(EXPIRES_MONTH, "months");
      const formattedDate = expireDate.format("MM/DD/YYYY hh:mm A");
      setExpireDateStr(formattedDate);
    };

    updateFormattedDate();

    const intervalId = setInterval(updateFormattedDate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`${styles.subscriptionDetails} mb-40`}>
      <h1>Start Your {TRIAL_PERIOD_DAYS}-day Free Trial</h1>
      <p>Price: ${MONTHLY_PRICE}</p>
      <p>Free trial Days: {TRIAL_PERIOD_DAYS} days</p>
      <p>Expires: {EXPIRES_MONTH} month</p>
      <p>Expire Date: {expireDateStr}</p>
    </div>
  );
};

export default SubscriptionPlan;
