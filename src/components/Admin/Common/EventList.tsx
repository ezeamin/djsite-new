import CompromiseDescription from '../Compromise/CompromiseDescription';
import EventDescription from '../Event/EventDescription';

import { getEvents } from '@/utilities';

import { Compromise, Event } from '@/interface';

export const revalidate = 3600; // 1 hour

const EventList = async () => {
  const events = (await getEvents({
    finished: false,
    fullData: true,
  })) as Event[] | Compromise[];

  if (events.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh_-_350px)] items-center justify-center px-2 text-center">
        <p>No hay eventos próximos 🥺</p>
      </div>
    );
  }

  return (
    <section className="mt-3">
      {events.map((event) =>
        'title' in event ? (
          <EventDescription event={event} key={event.id} />
        ) : (
          <CompromiseDescription compromise={event} key={event.id} />
        )
      )}
    </section>
  );
};
export default EventList;
