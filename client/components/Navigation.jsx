'use client';
import React from 'react';

import { NavItem } from './NavItem';

const navItems = ['App', 'Payments', 'Customers', 'Subscriptions'];

export function Navigation() {
  return (
    <nav className='nav'>
      {navItems.map((item, index) => (
        <NavItem key={index} title={item} />
      ))}
    </nav>
  );
}
