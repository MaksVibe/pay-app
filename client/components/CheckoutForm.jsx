import { useEffect, useRef, useState } from 'react';

import Loading from '@/app/loading';

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [refunds, setRefunds] = useState([]);
  const idRef = useRef();
  const amountRef = useRef();

  const fetchRefunds = (signal) => {
    fetch('http://localhost:3010/api/v1/refunds', { signal })
      .then((res) => res.json())
      .then((refunds) => setRefunds(refunds.data))
      .catch((error) => console.log(error.message));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    fetch(`http://localhost:3010/api/v1/refunds/${idRef.current.value}`, {
      method: 'POST',
      body: JSON.stringify({
        amount: amountRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log('data', data))
      .catch((error) => console.log(error.message));

    setIsLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (isLoading) return;
    fetchRefunds(signal);
    return () => {
      controller.abort();
    };
  }, [isLoading]);

  return (
    <div style={{ display: 'flex' }}>
      <form onSubmit={handleSubmit} className='form'>
        <input ref={idRef} type='text' placeholder='Payment ID' />
        <input ref={amountRef} type='text' placeholder='Amount' />
        <button disabled={isLoading}>
          <span>{isLoading ? <Loading /> : 'Pay now'}</span>
        </button>
      </form>
      <table className='payments__table'>
        <thead>
          <tr>
            <th className='payments__align-right'>Amount</th>
            <th className='payments__align-right'>Currency</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map(({ amount, currency, status, created }, index) => {
            const date = new Date(created * 1000);
            return (
              <tr key={index + 1}>
                <td className='payments__align-right'>{amount / 100}</td>
                <td className='payments__align-right'>{currency}</td>
                <td>{status}</td>
                <td>{date.toUTCString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
