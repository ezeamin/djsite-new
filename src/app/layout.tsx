import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactNode } from 'react';

import { Toaster } from 'sonner';

import BackButton from '@/components/Common/BackButton';

import { metadataConf, viewportConf } from '@/constants/metadata';

import { barlow } from '@/styles/fonts';
import '@/styles/globals.css';
import '@/styles/tailwind.css';

export const metadata = metadataConf;
export const viewport = viewportConf;

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="es">
      <body className={barlow.className}>
        {children}

        <Toaster richColors position="top-center" />
        <BackButton />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
