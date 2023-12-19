"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, FormEvent } from "react";

import { Toast, ToastUtil, ToastableError } from "@/components/ui/Toast";

import styles from "@/styles/pages/subscribe.module.scss";
const MONTHLY_PRICE = process.env.NEXT_PUBLIC_SUBSCRIBE_MONTHLY_PRICE;
const TRIAL_PERIOD_DAYS = process.env.NEXT_PUBLIC_SUBSCRIBE_TRIAL_PERIOD_DAYS;
const FourteenDayTrial = ({ email }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ToastableError | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  useEffect(() => {
    setCurrentEmail(email ?? null);
  }, [email]);

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

  const sendOTP = async (email: string) => {
    const response = await fetch("/api/otp/send", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new ToastableError(data.message, response.status);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!!currentEmail) {
      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify({
            email: currentEmail,
            fullName: null,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new ToastableError(data.message, response.status);
        }

        setError(null);

        router.push(`/subscribe/payment?email=${currentEmail}`);
      } catch (error) {
        console.error("There was an error!", error);
        setIsLoading(false);
        setError(error);
      }
    } else {
      const form = event.target as HTMLFormElement;
      const nameInput = form.elements.namedItem("name") as HTMLInputElement;
      const fullName = nameInput.value;
      const emailInput = form.elements.namedItem("email") as HTMLInputElement;
      const email = emailInput.value;

      if (!fullName || !email) return;

      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify({
            email,
            fullName,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new ToastableError(data.message, response.status);
        }

        setError(null);

        await sendOTP(email);
        router.push(`/subscribe/confirm-subscription?email=${email}`);
      } catch (error) {
        console.error("There was an error!", error);
        setIsLoading(false);
        setError(error);
      }
    }
  };

  return (
    <>
      <h1>Start Your {TRIAL_PERIOD_DAYS}-day Free Trial</h1>
      <p className={styles.copy}>
        After your free {TRIAL_PERIOD_DAYS} day trial ends, we will charge ${MONTHLY_PRICE} from your account every
        month. Subscription can be cancelled anytime within your trial period.
      </p>
      <form onSubmit={handleSubmit}>
        {!!currentEmail ? (
          <>
            <label>Email: {currentEmail || ""}</label>
          </>
        ) : (
          <>
            <div className={`input-groups`}>
              <div className={`input-group`}>
                <label>Full Name:</label>
                <input type="text" name="name" placeholder="Full name" required />
              </div>
            </div>

            <label>Email:</label>
            <input type="email" name="email" placeholder="Email" required />
          </>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </form>

      {!!currentEmail ? (
        <>
          <p>{/* ... */}</p>
        </>
      ) : (
        <>
          <p>
            Already have an account?{" "}
            <Link className={styles.altLink} href="/sign-in">
              {" "}
              Sign In
            </Link>
          </p>
        </>
      )}
      <Toast />
    </>
  );
};

export default FourteenDayTrial;
