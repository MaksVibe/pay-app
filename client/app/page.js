import { Suspense } from 'react';

import { Balances } from '@/components/Balances';

import Loading from './loading';

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Balances />
    </Suspense>
  );
}
