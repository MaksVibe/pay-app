'use client';
import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({ title }) {
  const path = usePathname();

  const linkTo = () => {
    switch (title) {
      case 'App':
        return '/';
      case 'Payments':
        return '/payments';
      case 'Customers':
        return '/customers';
      case 'Subscriptions':
        return '/subscriptions';
    }
  };

  return (
    <Link href={`${linkTo()}`} className={`nav__item ${linkTo() === path && 'active'}`}>
      {title}
    </Link>
  );
}
