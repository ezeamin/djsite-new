import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { PATHS } from '@/constants/paths';

const AuthenticatedAdminLayout = ({ children }: { children: ReactNode }) => {
  const authCookie = cookies().get('auth');

  if (!authCookie) {
    redirect(PATHS.HOME);
  }

  return children;
};
export default AuthenticatedAdminLayout;
