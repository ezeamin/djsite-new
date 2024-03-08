import { koulen } from '@/styles/fonts';

import { NextCompromiseItemProps } from '../interface/nextEvents';

const NextCompromiseItem = (props: NextCompromiseItemProps) => {
  const { compromise } = props;

  const formattedDate = new Date(compromise.date)
    .toLocaleDateString('es-AR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    })
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return (
    <article className="mb-3 rounded-xl bg-blue-200/50 p-3 text-center text-gray-700">
      <h2 className={`${koulen.className} -mb-1 text-2xl`}>
        Compromiso personal 😥
      </h2>
      <div className="divider my-0" />
      <h3 className={`${koulen.className} text-xl`}>
        {formattedDate} - {compromise.time}
      </h3>
    </article>
  );
};
export default NextCompromiseItem;
