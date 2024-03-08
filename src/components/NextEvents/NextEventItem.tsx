import { getEmoji } from '@/utilities';

import { koulen } from '@/styles/fonts';

import { NextEventItemProps } from '../interface/nextEvents';

const NextEventItem = (props: NextEventItemProps) => {
  const { event } = props;

  const formattedDate = new Date(event.date)
    .toLocaleDateString('es-AR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    })
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return (
    <article className="mb-3 rounded-xl bg-gray-200/50 p-3 text-center text-gray-700">
      <h2 className={`${koulen.className} -mb-1 text-2xl`}>
        {event.title} {getEmoji('event')}
      </h2>
      <div className="divider my-0" />
      <h3 className={`${koulen.className} text-xl`}>
        {formattedDate} - {event.time}
      </h3>
    </article>
  );
};
export default NextEventItem;
