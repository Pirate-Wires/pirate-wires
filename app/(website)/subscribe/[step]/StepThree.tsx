'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import SubscriptionPlan from '../components/SubscriptionPlan';
import CheckoutForm from '../components/CheckoutForm';
import styles from '@/styles/pages/subscribe.module.scss';

// const stripePromise = loadStripe((env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ) ?? '')
const stripePromise = loadStripe('pk_test_81KfkhavLe3j0FbgVinVWlRH');

interface StepThreeProps {
  email: string;
  customerId: string;
}

const StepThree: React.FC<StepThreeProps> = ({ email, customerId }) => {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleChangeError = (value: string) => {
    setError(value);
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/stripe-payment', {
          method: 'POST',
          body: JSON.stringify({
            customerId
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setIsLoading(false);
        setError(null);
        //router.push(`/subscribe/step-4?email=${email}`);
      } catch (error) {
        console.error(`Error creating payment intent: ${error.message}`);
        setIsLoading(false);
        setError(error.message);
      }
    };

    createPaymentIntent();
  }, []);

  return (
    <section className={`${styles.subscribeWrapper} flowContainer c-20 pb-20`}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        clientSecret && (
          <>
            <SubscriptionPlan />
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                email={email}
                customerId={customerId}
                handleChangeLoading={handleChangeLoading}
                handleChangeError={handleChangeError}
              />
            </Elements>
          </>
        )
      )}
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default StepThree;
