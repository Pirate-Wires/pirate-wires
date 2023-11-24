'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent } from 'react';

import styles from '@/styles/pages/subscribe.module.scss';

const StepOne = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  useEffect(() => {
    setCurrentEmail(user?.email ?? null);
  }, [user?.email]);

  const sendOTP = async (email: string) => {
    const response = await fetch('/api/otp/send', {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    });

    if (!response.ok) {
      throw new Error(`Error sending OTP`);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!!currentEmail) {
      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            email: currentEmail,
            fullName: null
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const customerId = data.payload.customerId;

        setError(null);

        router.push(`/subscribe/step-3?email=${currentEmail}&customerId=${customerId}`);
      } catch (error) {
        console.error('There was an error!', error);
        setIsLoading(false);
        setError(error.message);
      }
    } else {
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
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            email,
            fullName
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const customerId = data.payload.customerId;

        setError(null);

        if (currentEmail) {
          router.push(`/subscribe/step-3?email=${email}&customerId=${customerId}`);
        } else {
          await sendOTP(email);
          router.push(`/subscribe/step-2?email=${email}&customerId=${customerId}`);
        }
      } catch (error) {
        console.error('There was an error!', error);
        setIsLoading(false);
        setError(error.message);
      }
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
        {!!currentEmail ? (
          <>
            <label>Email: {currentEmail || ''}</label>
          </>
        ) : (
          <>
            <label>First Name:</label>
            <input type="text" name="fname" placeholder="First name" required />
            <br />
            <label>Last Name:</label>
            <input type="text" name="lname" placeholder="Last name" required />
            <br />
            <label>Email:</label>
            <input type="email" name="email" placeholder="Email" required />
          </>
        )}
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Continue'}
        </button>
      </form>

      {!!currentEmail ? (
        <>
          <p>
            {/* ... */}
          </p>
        </>
      ) : (
        <>
          <p>
            Already have an account?
            <Link className="nav-link" href="/sign-in">
              Sign In
            </Link>
          </p>
        </>
      )}



      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default StepOne;
