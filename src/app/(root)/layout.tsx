import { ReactNode } from 'react';

import BackButton from '@/components/Common/BackButton';
import Balls from '@/components/Common/Balls';
import Glass from '@/components/Common/Glass';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Glass>{children}</Glass>
      <Balls />
    </>
  );
}
