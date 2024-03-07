import { ReactNode } from 'react';

import Balls from '@/components/Common/Balls';
import Glass from '@/components/Common/Glass';
import LinkToAdmin from '@/components/Home/LinkToAdmin';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Glass>{children}</Glass>
      <Balls />
      <LinkToAdmin />
    </>
  );
}
