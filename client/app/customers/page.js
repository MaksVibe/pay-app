'use client';

import { Suspense } from 'react';

import Loading from '../loading';

export default function CustomersPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>Customers</Suspense>
    </main>
  );
}
