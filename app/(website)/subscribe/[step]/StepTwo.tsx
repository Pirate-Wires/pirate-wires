"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import styles from "@/styles/pages/subscribe.module.scss";
import OTPInput from "@/app/(website)/sign-in/OTPInput";
import {Toast, ToastUtil} from "@/components/ui/Toast";

interface StepTwoProps {
  email: string;
  customerId: string;
}

const StepTwo: React.FC<StepTwoProps> = ({email, customerId}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      ToastUtil.showLoadingToast();
    } else {
      ToastUtil.dismissToast();
    }
  }, [isLoading]);

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
      <Toast />
    </>
  );
};

export default StepTwo;
