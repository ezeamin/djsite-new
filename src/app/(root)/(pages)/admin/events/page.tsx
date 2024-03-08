import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import ChangeMessage from '@/components/Admin/Common/ChangeMessage';
import EventList from '@/components/Admin/Common/EventList';
import DashboardHeader from '@/components/Admin/DashboardHeader';

import { PATHS } from '@/constants/paths';
import { getMessage } from '@/utilities';

import { koulen } from '@/styles/fonts';

const AdminEventsPage = async () => {
  const authCookie = cookies().get('auth');
  const message = await getMessage();

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
      <ChangeMessage message={message} />
      <EventList />
    </>
  );
};
export default AdminEventsPage;
