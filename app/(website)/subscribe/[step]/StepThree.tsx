'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

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

  useEffect(() => {
    const createPaymentIntent = async () => {
      setIsLoading(true);
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
        router.push(`/subscribe/step-4?email=${email}`);
      } catch (error) {
        console.error(`Error creating payment intent: ${error.message}`);
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )
      )}
    </>
  );
};

export default StepThree;
