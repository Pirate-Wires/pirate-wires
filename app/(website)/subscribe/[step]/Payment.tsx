"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import SubscriptionPlan from "../components/SubscriptionPlan";
import CheckoutForm from "../components/CheckoutForm";
import { Toast, ToastUtil, ToastableError } from "@/components/ui/Toast";

// const stripePromise = loadStripe((env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ) ?? '')
const stripePromise = loadStripe("pk_test_81KfkhavLe3j0FbgVinVWlRH");

interface PaymentProps {
  email: string;
  subscription: string | null;
}

const Payment: React.FC<PaymentProps> = ({ email, subscription }) => {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
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

  useEffect(() => {
    const createPaymentIntent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/stripe-payment", {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new ToastableError(data.message, response.status);
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error(`Error creating payment intent: ${error.message}`);
        setIsLoading(false);
        setError(error);
      }
    };

    createPaymentIntent();
  }, [email]);

  const handleClickSkip = () => {
    router.push(`/subscribe/newsletters?email=${email}`);
  };

  return (
    <>
      <SubscriptionPlan />
      {subscription ? (
        <>
          <h1>You have already subscribed</h1>
          <button onClick={handleClickSkip}>Next</button>
        </>
      ) : (
        clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm email={email} />
          </Elements>
        )
      )}
      <Toast />
    </>
  );
};

export default Payment;
