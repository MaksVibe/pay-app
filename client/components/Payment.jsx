import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { usePathname } from 'next/navigation';

import CheckoutForm from './CheckoutForm';

function Payment({ stripePromise }) {
  const path = usePathname();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const chooseFetchUrl = () => {
      switch (path) {
        case '/':
          return 'donate';
        case '/refunds':
          return 'refunds';
        case '/subsriptions':
          return 'create-payment-intent';
        case '/user':
          return 'create-payment-intent';
      }
    };
    // Create PaymentIntent as soon as the page loads retrieve-payment-link
    fetch(`http://localhost:3010/api/v1/${chooseFetchUrl()}`)
      .then((res) => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, [path]);

  return (
    clientSecret &&
    stripePromise && (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    )
  );
}

export default Payment;
