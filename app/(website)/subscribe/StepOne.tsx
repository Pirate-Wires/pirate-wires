'use client';
import Link from 'next/link';
import React, { useState, FormEvent } from 'react';

import { useSupabase } from '@/app/(website)/supabase-provider';
import styles from '@/styles/pages/subscribe.module.scss';

interface StepOneProps {
  onSubmitEmail: (value: string) => void;
  onNextStep: (step: number) => void;
}

const StepOne: React.FC<StepOneProps> = ({ onSubmitEmail, onNextStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabase();

  const sendOTP = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email
    });

    if (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const fnameInput = form.elements.namedItem('fname') as HTMLInputElement;
    const fname = fnameInput.value;
    const lnameInput = form.elements.namedItem('lname') as HTMLInputElement;
    const lname = lnameInput.value;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;
    const fullName = `${fname} ${lname}`;

    if (!fname || !lname || !email) return;

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/create-user', {
        method: 'POST',
        body: JSON.stringify({
          email,
          fullName
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setIsLoading(false);
      setError(null);

      await sendOTP(email);

      onSubmitEmail(email);
      onNextStep(2);
    } catch (error) {
      console.error('There was an error!', error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <section className={`${styles.subscribeWrapper} flowContainer c-20 pb-20`}>
      <h1>Start Your 14-day Free Trial</h1>
      <p>
        After your free 14 day trial ends, we will charge $12 from your account
        every month. Subscription can be cancelled anytime within your trial
        period.
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fname" placeholder="First name" required />
        <input type="text" name="lname" placeholder="Last name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Continue'}
        </button>
      </form>
      <p>
        Already have an account?
        <Link className="nav-link" href="/sign-in">
          Sign In
        </Link>
      </p>
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default StepOne;
