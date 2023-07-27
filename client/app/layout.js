import { Inter } from 'next/font/google';

import { Header } from '@/components/Header';

import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pay app',
  description: 'Application written with next, express',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='layout'>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
