import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import DashboardHeader from '@/components/Admin/DashboardHeader';
import EventList from '@/components/Admin/EventList';

import { PATHS } from '@/constants/paths';

import { koulen } from '@/styles/fonts';

const AdminEventsPage = () => {
  const authCookie = cookies().get('auth');

  if (!authCookie) {
    redirect(PATHS.HOME);
  }

  return (
    <>
      <DashboardHeader />
      <Link
        className={`three-d-button--red btn w-full ${koulen.className} text-lg`}
        href={PATHS.ADMIN.CREATE.EVENT}
      >
        CARGAR EVENTO
      </Link>
      <Link
        className={`three-d-button--primary btn w-full ${koulen.className} mt-2 text-lg`}
        href={PATHS.ADMIN.CREATE.COMPROMISE}
      >
        CARGAR COMPROMISO
      </Link>
      <EventList />
    </>
  );
};
export default AdminEventsPage;
