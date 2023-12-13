// /app/(website)/sign-in/AuthUI.tsx
"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

import {useSupabase} from "@/app/(website)/supabase-provider";

import OTPInput from "./OTPInput";
import EmailInput from "./EmailInput";
import {Toast, ToastUtil} from "@/components/ui/Toast";

import styles from "@/styles/pages/signIn.module.scss";

export default function AuthUI() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const {supabase} = useSupabase();

  const handleEmailSubmit = async e => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const email = e.target.email.value;

    try {
      const getResponse = await fetch(`/api/user?email=${email}`);

      if (!getResponse.ok) {
        throw new Error(`HTTP error! Status: ${getResponse.status}`);
      }

      const {user} = await getResponse.json();
      if (!user) {
        // Import Link from "next/link" at the top of the file

        // Inside the handleEmailSubmit function, modify the error message to include a link
        throw new Error(
          `You don't have an account. Please go to the <a href="/subscribe">subscribe page</a> to sign up!`,
        );
      }

      const sendResponse = await fetch("/api/otp/send", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });

      if (!sendResponse.ok) {
        throw new Error(`HTTP error! Status: ${sendResponse.status}`);
      }

      setEmail(email);
      setOtpVisible(true);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const password =
        process.env.SUPABASE_AUTH_USER_DEFAULT_PASSWORD || "12345678";
      const {error: signInError} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Error signing in:", signInError);
        return {error: signInError};
      }

      setIsLoading(false);
      router.push("/account");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleResendOTP = async e => {
    e.preventDefault();
    if (resending) return;
    setError(null);
    setResending(true);
    setSuccessMsg(null);

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setOtpVisible(true);
      setResending(false);
      setSuccessMsg("Resent OTP successfully");
    } catch (error) {
      setError(error.message);
      setResending(false);
    }
  };

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

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

  return (
    <section className={`${styles.signInWrapper} flowContainer c-20 pb-20`}>
      <h1>Sign In to Pirate Wires</h1>
      <>
        {otpVisible ? ( // Show OTPInput component when otpVisible is true
          <div className={styles.verifyStep}>
            <h2>We just sent a 6 digit code to your email</h2>
            <form onSubmit={handleOTPSubmit}>
              <OTPInput onOTPChange={handleOTPChange} />
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Confirming..." : "Confirm"}
              </button>
              <a href="#" onClick={handleResendOTP}>
                {resending ? "Resending..." : "Resend Code"}
              </a>
            </form>
          </div>
        ) : (
          <div className={styles.enterEmailStep}>
            <EmailInput onSubmit={handleEmailSubmit} isLoading={isLoading} />
          </div>
        )}
      </>
      <div className={styles.substackNotice}>
        <h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 17"
            fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0.34436H14V2.29012H0V0.34436ZM0 7.4417H14V16.1905L6.99856 12.2973L0 16.1905V7.4417ZM0 3.89302H14V5.83878H0V3.89302Z"
              fill="#FF681A"
            />
          </svg>
          Are you here from Substack?
        </h3>
        <p>
          If you’ve been a subscriber of Pirate Wires while we were published on
          Substack, then you already have an account! Just go to the Sign In
          page and enter your email to get started.
        </p>
        {/* <Link href="/sign-in-github" style={{textDecoration: "underline"}}>
          Dev: GitHub Sign-in (OTP under construction)
        </Link> */}
      </div>

      <p className={`disclaimer`}>
        By continuing, you agree to the{" "}
        <Link
          target={"_blank"}
          href={
            "https://app.termly.io/document/terms-of-service/7109fc1e-402d-466e-9f79-fe8cbe4a2b71"
          }>
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link
          target={"_blank"}
          href={
            "https://app.termly.io/document/privacy-policy/42d3d1fe-f9d0-4cc4-9685-91ce1329b836"
          }>
          Privacy Policy
        </Link>
      </p>
      <Toast />
    </section>
  );
}
