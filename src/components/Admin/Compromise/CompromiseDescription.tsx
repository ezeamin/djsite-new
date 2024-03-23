import Link from 'next/link';

import Grid from '../../ui/Grid/Grid';
import EventElement from '../Common/EventElement';
import DeleteCompromiseButton from './DeleteCompromiseButton';
import dayjs from 'dayjs';

import { PATHS } from '@/constants/paths';

import { koulen } from '@/styles/fonts';

import { CompromiseDescriptionProps } from '../../interface/admin';

const CompromiseDescription = (props: CompromiseDescriptionProps) => {
  const { compromise, finished } = props;

  const formattedMainDate = new Date(compromise.date)
    .toLocaleDateString('es-AR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    })
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const formattedDetailsDate = dayjs(compromise.date).format('DD/MM/YYYY');

  return (
    <article className="mb-3 rounded-xl bg-blue-300/50 p-3 text-start text-gray-700">
      <h2 className={`${koulen.className} -mb-1 text-2xl`}>
        {compromise.reason}
      </h2>
      <h3 className="font-bold">{formattedMainDate}</h3>
      <div className="divider my-0" />
      <EventElement label="Fecha" value={formattedDetailsDate} />
      <EventElement label="Turno" value={compromise.time} />
      {!finished && (
        <Grid container className="mt-3" component="section" gap={2}>
          <Grid item xs={6}>
            <Link
              className={`three-d-button--gray btn w-full items-center ${koulen.className} text-lg text-white`}
              href={`${PATHS.ADMIN.CREATE.COMPROMISE}/${compromise.id}`}
              target="_blank"
            >
              MODIFICAR
            </Link>
          </Grid>
          <Grid item xs={6}>
            <DeleteCompromiseButton
              id={compromise.id}
              reason={compromise.reason}
            />
          </Grid>
        </Grid>
      )}
    </article>
  );
};
export default CompromiseDescription;
