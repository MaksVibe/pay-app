'use client';
import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

export function Balances() {
  const [currentBalance, setCurrentBalance] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('http://localhost:3010/api/v1/balance', { signal })
      .then((res) => res.json())
      .then(({ balance }) => setCurrentBalance(balance))
      .catch((error) => console.log(error.message));
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <AnimatePresence>
      {currentBalance && (
        <motion.main
          style={{ padding: '20px', color: '#232323' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ type: 'easeInOut' }}
        >
          <h1 style={{ fontSize: '32px' }}>Balances</h1>
          <>
            <p>USD Balance: &#65284; {currentBalance.available[0].amount / 100}</p>
            <p>Upcoming payouts to your bank: &#65284; {currentBalance.pending[0].amount / 100}</p>
          </>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
