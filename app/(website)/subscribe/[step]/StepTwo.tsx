"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/app/(website)/supabase-provider";
import OTPInput from "@/app/(website)/sign-in/OTPInput";
import { Toast, ToastUtil, ToastableError } from "@/components/ui/Toast";

import styles from "@/styles/pages/subscribe.module.scss";

interface StepTwoProps {
  email: string;
}

const StepTwo: React.FC<StepTwoProps> = ({ email }) => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<ToastableError | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
    if (successMsg) {
      ToastUtil.showSuccessToast(successMsg);
    }
  }, [successMsg]);

  const handleOTPSubmit = async event => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    setSuccessMsg(null);

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new ToastableError(data.message, response.status);
      }

      const password = process.env.SUPABASE_AUTH_USER_DEFAULT_PASSWORD || "12345678";
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Error signing in:", signInError);
        throw new ToastableError(signInError.message, signInError.status);
      }

      router.push(`/subscribe/step-3?email=${email}`);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const handleResendOTP = async e => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setSuccessMsg(null);

    try {
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

      setIsLoading(false);
      setSuccessMsg("Resent OTP successfully");
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  return (
    <>
      <h1>Confirm Your Subscription </h1>
      <div>
        <p className={styles.copy}>We just sent a 6 digit code to your email</p>
        <form onSubmit={handleOTPSubmit}>
          <OTPInput onOTPChange={handleOTPChange} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Proceed to payment"}
          </button>
          <a href="#" onClick={handleResendOTP}>
            Resend Code
          </a>
        </form>
      </div>
      <Toast />
    </>
  );
};

export default StepTwo;
