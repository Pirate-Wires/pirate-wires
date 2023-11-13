'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/pages/subscribe.module.scss';
import { useSupabase } from '@/app/(website)/supabase-provider';
import OTPInput from '@/app/(website)/sign-in/OTPInput';

interface StepTwoProps {
  email: string;
  customerId: string;
}

const StepTwo: React.FC<StepTwoProps> = ({ email, customerId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { supabase } = useSupabase();

  const handleOTPSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    setSuccessMsg(null);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) {
        throw error;
      }

      setIsLoading(false);
      router.push(`/subscribe/step-3?email=${email}&customerId=${customerId}`);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setSuccessMsg(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email
      });

      if (error) {
        throw error;
      }

      setIsLoading(false);
      setSuccessMsg('Resent OTP successfully');
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  return (
    <section className={`${styles.subscribeWrapper} flowContainer c-20 pb-20`}>
      <h1>Confirm Your Subscription </h1>
      <div>
        <h2>Confirm Your Sign In</h2>
        <p>We just sent a 6 digit code to your email</p>
        <form onSubmit={handleOTPSubmit}>
          <OTPInput onOTPChange={handleOTPChange} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Proceed payment'}
          </button>
          <br />
          <a href="#" onClick={handleResendOTP}>
            Resend Code
          </a>
        </form>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {successMsg && <p className={styles.success}>{successMsg}</p>}
    </section>
  );
};

export default StepTwo;
