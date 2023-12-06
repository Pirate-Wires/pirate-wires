import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import {Toast, ToastUtil} from "@/components/ui/Toast";

import styles from "@/styles/pages/subscribe.module.scss";

interface CheckoutFormProps {
  email: string;
  customerId: string;
}

const PRICE_ID = `price_1OC2psBkYPy9DRcAeTacJpsM`;

const CheckoutForm: React.FC<CheckoutFormProps> = ({email, customerId}) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      ToastUtil.showLoadingToast();
    } else {
      ToastUtil.dismissToast();
    }
  }, [isLoading]);


  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await stripe.confirmSetup({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        throw result.error;
      }
      if (result.setupIntent && result.setupIntent.status === "succeeded") {
        const paymentMethodId = result.setupIntent.payment_method;

        const response = await fetch("/api/stripe-subscription", {
          method: "POST",
          body: JSON.stringify({
            paymentMethodId,
            customerId,
            priceId: PRICE_ID,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setIsLoading(false);
        router.push(`/subscribe/step-4?email=${email}`);
      }
    } catch (error) {
      console.error(`Error creating subscription: ${error.message}`);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe || isLoading}>
          {isLoading ? "Loading..." : "Subscribe"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <Toast />
    </>
  );
};

export default CheckoutForm;
