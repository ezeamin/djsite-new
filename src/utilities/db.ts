'use server';

import { prisma } from './prisma';
import { sortEvents } from './utils';

import { Compromise, Event, MinimalEvent } from '@/interface';

export const getEvents = async ({
  finished,
  fullData = false,
}: {
  finished: boolean;
  fullData: boolean;
}): Promise<(Event | Compromise | MinimalEvent)[]> => {
  const eventsPromise = prisma.event.findMany({
    where: {
      date: {
        ...(finished ? { gte: new Date() } : { lt: new Date() }),
      },
    },
    include: {
      client: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
  });

  const compromisesPromise = prisma.compromise.findMany({
    where: {
      date: {
        ...(finished ? { gte: new Date() } : { lt: new Date() }),
      },
    },
  });

  const [events, compromises] = await Promise.all([
    eventsPromise,
    compromisesPromise,
  ]);

  if (!fullData) {
    const minimalEvents: MinimalEvent[] = events.map((event) => ({
      id: event.id,
      date: event.date,
      time: event.time as 'Dia' | 'Noche',
      type: 'event',
      title: event.title,
    }));

    const minimalCompromises: MinimalEvent[] = compromises.map(
      (compromise) => ({
        id: compromise.id,
        date: compromise.date,
        time: compromise.time as 'Dia' | 'Noche',
        type: 'compromise',
      })
    );

    const data = [...minimalEvents, ...minimalCompromises].sort(sortEvents);

    return data;
  }

  const data = [...events, ...compromises].sort(sortEvents);

  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postEvent = async (event: /* CreateEventSchema */ any) => {
  const phone = `+549${event.client.phone}`;

  // replace ñ and accents
  const title = event.title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/Ñ/g, 'N');

  await prisma.event.create({
    data: {
      title,
      date: event.date,
      time: event.time,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      service: event.service,
      price: event.price,
      paid: event.paid,
      observations: event.observations,
      client: {
        create: {
          name: event.client.name,
          phone,
        },
      },
    },
  });
};
