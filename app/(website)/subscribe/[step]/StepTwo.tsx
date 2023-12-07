"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/app/(website)/supabase-provider";
import OTPInput from "@/app/(website)/sign-in/OTPInput";

import styles from "@/styles/pages/subscribe.module.scss";

interface StepTwoProps {
  email: string;
  customerId: string;
}

const StepTwo: React.FC<StepTwoProps> = ({ email, customerId }) => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
        throw new Error(`Error verifying otp`);
      }

      const password = process.env.SUPABASE_AUTH_USER_DEFAULT_PASSWORD || "12345678";
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Error signing in:", signInError);
        return { error: signInError };
      }

      router.push(`/subscribe/step-3?email=${email}&customerId=${customerId}`);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
        throw new Error(`Error sending OTP`);
      }

      setIsLoading(false);
      setSuccessMsg("Resent OTP successfully");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
      {error && <p className={styles.error}>{error}</p>}
      {successMsg && <p className={styles.success}>{successMsg}</p>}
    </>
  );
};

export default StepTwo;
