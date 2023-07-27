'use client';
import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

export function PaymentsList() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = (signal) => {
    fetch('http://localhost:3010/api/v1/payment-intents', { signal })
      .then((res) => res.json())
      .then(({ paymentIntents }) => setPayments(paymentIntents.data))
      .catch((error) => console.log('error:', error.message));
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchPayments(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <AnimatePresence>
      {payments && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: 'easeInOut' }}
        >
          <table className='payments__table'>
            <caption className='payments__title'>Payments</caption>
            <thead style={{ textTransform: 'capitalize' }}>
              <tr>
                <th>amount</th>
                <th></th>
                <th></th>
                <th>description</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(({ amount, currency, status, created, id }, index) => {
                const date = new Date(created * 1000);
                const dollarSign = '$';
                const euroSign = '€';
                return (
                  <tr key={index + 1}>
                    <td align='right'>
                      {(currency === 'eur' ? euroSign : currency === 'usd' ? dollarSign : 'c.u.') + ' ' + amount / 100}
                    </td>
                    <td style={{ textTransform: 'uppercase' }}>{currency}</td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {status === 'requires_payment_method' ? 'incomplete' : status}
                    </td>
                    <td>{id}</td>
                    <td>
                      {date.toLocaleString('en-us', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
