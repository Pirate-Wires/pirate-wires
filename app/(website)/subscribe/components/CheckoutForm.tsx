import React from 'react';
import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  email: string;
  customerId: string;
  handleChangeError: (value: string) => void;
  handleChangeLoading: (value: boolean) => void;
}

const HOST_NAME = process.env.NEXT_PUBLIC_HOSTNAME;
const PRICE_ID = `price_1OBsEaBkYPy9DRcAT36VqYH3`;

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  email,
  customerId,
  handleChangeError,
  handleChangeLoading
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    handleChangeLoading(true);

    try {
      const response = await fetch('/api/stripe-subscription', {
        method: 'POST',
        body: JSON.stringify({ customerId, priceId: PRICE_ID })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${HOST_NAME}/subscribe/step-4?email=${email}`
        }
      });

      if (result.error) {
        throw result.error;
      }
      handleChangeLoading(false);
    } catch (error) {
      console.log(`Error creating subscription: ${error.message}`);
      handleChangeError(error.message);
      handleChangeLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};

export default CheckoutForm;
