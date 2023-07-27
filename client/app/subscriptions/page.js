import { Suspense } from 'react';

import Loading from '../loading';

export default function SubscriptionsPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>Subscriptions</Suspense>
    </main>
  );
}
