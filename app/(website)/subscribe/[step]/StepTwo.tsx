"use client"
import { useState } from 'react';
import styles from "@/styles/pages/subscribe.module.scss"
import { useSupabase } from '@/app/(website)/supabase-provider';
import OTPInput from "@/app/(website)/sign-in/OTPInput";

export default function StepTwo() {
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabase();

  const handleOTPSubmit = async (otp: string) => {
      setError(null);

      // try {
      //     await supabase.auth.verifyOtp({
      //         email,
      //         token: otp,
      //         type: 'email',
      //         options: {
      //             redirectTo: '/account'
      //         }
      //     });
      // } catch (error) {
      //     setError('Invalid OTP. Please check your email and try again.');
      // }
  };
  return (
    <section className={`${styles.subscribeWrapper} flowContainer c-20 pb-20`}>
      <h1>Confirm Your Subscription </h1>
      {/* <OTPInput onOTPSubmit={handleOTPSubmit} /> */}
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
}
