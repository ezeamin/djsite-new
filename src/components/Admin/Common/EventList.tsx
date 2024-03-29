import CompromiseDescription from '../Compromise/CompromiseDescription';
import EventDescription from '../Event/EventDescription';

import { getEvents } from '@/utilities';

import { EventListProps } from '@/components/interface/admin';
import { Compromise, Event } from '@/interface';

const EventList = async (props: EventListProps) => {
  const { finished = false } = props;

  const events = (await getEvents({
    finished,
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
          <EventDescription event={event} finished={finished} key={event.id} />
        ) : (
          <CompromiseDescription
            compromise={event}
            finished={finished}
            key={event.id}
          />
        )
      )}
    </section>
  );
};
export default EventList;
