'use client';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

export function PaymentsLinks() {
  const [pLinks, setPLinks] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('http://localhost:3010/api/v1/payment_links', { signal })
      .then((res) => res.json())
      .then((data) => setPLinks(data))
      .catch((error) => console.log(error.message));
    return () => {
      controller.abort();
    };
  }, []);
  return (
    pLinks && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: 'easeInOut' }}
      >
        <table className='payments__table'>
          <caption className='payments__title'>Payments</caption>
          <thead style={{ textTransform: 'uppercase' }}>
            <tr>
              <th align='left'>link url</th>
              <th></th>
              <th>status</th>
              <th>name</th>
              <th>price</th>
              <th>created</th>
            </tr>
          </thead>
          <tbody>
            {pLinks.info.map(({ url, active }, index) => {
              const dollarSign = '$';
              const euroSign = '€';
              const { description, currency, amount_total, price } = pLinks.details[index].data[0];
              const date = new Date(price.created * 1000);
              return (
                <tr key={index + 1}>
                  <td>{url}</td>
                  <td></td>
                  <td style={{ textTransform: 'capitalize' }}>{active ? 'active' : 'inactive'}</td>
                  <td style={{ textTransform: 'capitalize' }}>{description}</td>
                  <td>
                    {description === 'React' &&
                      (currency === 'eur' ? euroSign : currency === 'usd' ? dollarSign : 'c.u.') +
                        ' ' +
                        amount_total / 100 +
                        ` ${currency === 'eur' ? 'EUR' : currency === 'usd' ? 'USD' : 'c.u.'} / month`}
                    {description === 'Donate' &&
                      `Customer chooses (${currency === 'eur' ? 'EUR' : currency === 'usd' ? 'USD' : 'c.u.'})`}
                  </td>
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
    )
  );
}
