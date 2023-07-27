import { Suspense } from 'react';

import { PaymentsList } from '@/components/PaymentsList';

import Loading from '../loading';

export default function PaymentsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentsList />
    </Suspense>
  );
}
