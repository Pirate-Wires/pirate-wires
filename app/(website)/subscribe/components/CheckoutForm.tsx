import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import {Toast, ToastUtil, ToastableError} from "@/components/ui/Toast";

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
  const [error, setError] = useState<ToastableError | null>(null);

  useEffect(() => {
    if (isLoading) {
      ToastUtil.showLoadingToast();
    } else {
      ToastUtil.dismissToast();
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      ToastUtil.showErrorToast(error);
    }
  }, [error]);
  
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
        if (result.error.message) {
          throw new ToastableError(result.error.message);
        }
        throw new ToastableError("Error setting up subscription. Please try again");
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
          throw new ToastableError("Error creating subscription. Please try again", response.status)
        }

        setIsLoading(false);
        router.push(`/subscribe/step-4?email=${email}`);
      }
    } catch (error) {
      console.error(`Error creating subscription: ${error.message}`);
      setIsLoading(false);
      setError(error);
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
      <Toast />
    </>
  );
};

export default CheckoutForm;
