import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import Balls from '@/components/Common/Balls';
import Glass from '@/components/Common/Glass';

import '../styles/globals.css';
import '../styles/tailwind.css';
import { barlow } from '@/styles/fonts';

export const metadata: Metadata = {
  title: 'DJ EZE AMIN',
  authors: [
    {
      name: 'Ezequiel Amin',
    },
  ],
  keywords: 'dj, tucuman, eventos, musica, fiestas, ezeamin, eze amin',
  description: 'Servicios de DJ para eventos - Tucumán, Arg.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={barlow.className}>
        <Glass>{children}</Glass>
        <Balls />
        <Analytics />
      </body>
    </html>
  );
}
