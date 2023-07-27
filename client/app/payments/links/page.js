import { Suspense } from 'react';

import Loading from '@/app/loading';
import { PaymentsLinks } from '@/components/PaymentsLinks';

export default function PaymentsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentsLinks />
    </Suspense>
  );
}
