import NextCompromiseItem from './NextCompromiseItem';
import NextEventItem from './NextEventItem';

import { NextEventsListProps } from '../interface/nextEvents';

const NextEventsList = (props: NextEventsListProps) => {
  const { events } = props;

  if (events.length === 0) return null;

  return (
    <section className="mt-3">
      {events.map((event) =>
        event.type === 'event' ? (
          <NextEventItem event={event} key={event.id} />
        ) : (
          <NextCompromiseItem compromise={event} key={event.id} />
        )
      )}
    </section>
  );
};
export default NextEventsList;
