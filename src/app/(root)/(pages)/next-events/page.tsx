import Title from '@/components/Common/Title';
import NextEventsList from '@/components/NextEvents/NextEventsList';

import { getEvents } from '@/utilities';

import { MinimalEvent } from '@/interface';

const NextEventsPage = async () => {
  // fetch events
  const events = (await getEvents({
    finished: false,
    fullData: false,
  })) as MinimalEvent[];

  return (
    <>
      <Title title="Proximos eventos" />
      {/* <BudgetForm /> */}
      {events.length === 0 && (
        <section className="flex h-fit items-center justify-center px-2 py-32 text-center">
          <p>No hay eventos próximos 🥺</p>
        </section>
      )}
      <NextEventsList events={events} />
    </>
  );
};
export default NextEventsPage;
