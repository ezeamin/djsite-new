import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Toaster } from 'sonner';

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
  themeColor: '#30426b',
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
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
