import Link from 'next/link';

import EventElement from '../Common/EventElement';
import dayjs from 'dayjs';
import { FaCarSide, FaWhatsapp } from 'react-icons/fa6';

import Grid from '@/components/ui/Grid/Grid';

import { PATHS } from '@/constants/paths';
import { buildNavigationLink, getAmountOfHours } from '@/utilities';

import { koulen } from '@/styles/fonts';

import { EventDescriptionProps } from '../../interface/admin';

const EventDescription = (props: EventDescriptionProps) => {
  const { event, finished } = props;

  // From ISO to Vie 08 Mar without dayjs
  const formattedMainDate = new Date(event.date)
    .toLocaleDateString('es-AR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    })
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const formattedDetailsDate = dayjs(event.date).format('DD/MM/YYYY');

  const amountOfHours = getAmountOfHours({
    date: event.date,
    start: event.startTime,
    end: event.endTime,
  });

  return (
    <article className="mb-3 rounded-xl bg-gray-200/50 p-3 text-start text-gray-700">
      <h2 className={`${koulen.className} -mb-1 text-2xl`}>{event.title}</h2>
      <h3 className="font-bold">{formattedMainDate}</h3>
      <div className="divider my-0" />
      <EventElement label="Fecha" value={formattedDetailsDate} />
      <EventElement label="Turno" value={event.time} />
      <EventElement
        label="Horario"
        value={`${event.startTime} - ${event.endTime}`}
      />
      <EventElement label="Horas" value={`${amountOfHours} horas`} />
      <EventElement label="Ubicación" value={event.location} />
      <EventElement label="Servicio" value={event.service} />
      <EventElement label="Observaciones" value={event.observations} />
      <div className="divider my-0" />
      <EventElement label="Cliente" value={event.client.name} />
      <EventElement label="Teléfono" value={event.client.phone} />
      <div className="divider my-0" />
      <EventElement bold label="Precio" value={`$${event.price.toString()}`} />
      <EventElement
        label="Pagado"
        value={
          finished ? `$${event.price.toString()}` : `$${event.paid.toString()}`
        }
      />
      <EventElement
        bold
        label="Pendiente"
        value={finished ? '$0' : `$${event.price - event.paid}`}
      />
      {!finished && (
        <Link
          className={`three-d-button--red btn mb-2 mt-3 w-full ${koulen.className} text-lg text-white`}
          href={`${PATHS.ADMIN.CREATE.EVENT}/${event.id}`}
        >
          MODIFICAR
        </Link>
      )}
      <Grid
        container
        className={finished ? 'mt-3' : ''}
        component="section"
        gap={2}
      >
        <Grid item xs={6}>
          <Link
            className={`three-d-button--gray btn w-full items-center ${koulen.className} text-lg text-white`}
            href={buildNavigationLink(event.location)}
            target="_blank"
          >
            <FaCarSide />
            NAVEGAR
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link
            className={`three-d-button--green btn w-full items-center ${koulen.className} text-lg text-white`}
            href={`https://wa.me/${event.client.phone}`}
            target="_blank"
          >
            <FaWhatsapp />
            MENSAJE
          </Link>
        </Grid>
      </Grid>
    </article>
  );
};
export default EventDescription;
