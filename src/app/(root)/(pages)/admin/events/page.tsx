import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import ChangeMessage from '@/components/Admin/Common/ChangeMessage';
import EventList from '@/components/Admin/Common/EventList';
import DashboardHeader from '@/components/Admin/DashboardHeader';
import Grid from '@/components/ui/Grid/Grid';

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
      <Grid container gap={2}>
        <Grid item xs={6}>
          <Link
            className={`three-d-button--red btn w-full ${koulen.className} text-lg`}
            href={PATHS.ADMIN.CREATE.EVENT}
          >
            EVENTO
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link
            className={`three-d-button--primary btn w-full ${koulen.className} text-lg`}
            href={PATHS.ADMIN.CREATE.COMPROMISE}
          >
            COMPROMISO
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link
            className={`three-d-button--gray btn w-full ${koulen.className} text-lg`}
            href={PATHS.ADMIN.DISCOUNT_CODES}
          >
            CODIGOS DE DESC
          </Link>
        </Grid>
        <Grid item xs={6}>
          <ChangeMessage message={message} />
        </Grid>
      </Grid>
      <EventList />
    </>
  );
};
export default AdminEventsPage;
