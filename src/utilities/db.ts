'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from './prisma';
import { sortEvents } from './utils';

import { Compromise, Event, MinimalEvent } from '@/interface';

// COMMON -------------------------------------

export const getBusyDates = async () => {
  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    select: {
      date: true,
      time: true,
    },
  });

  const compromises = await prisma.compromise.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    select: {
      date: true,
      time: true,
    },
  });

  const data = [...events, ...compromises];

  return data;
};

export const getMessage = async () => {
  const messages = await prisma.message.findMany({
    select: {
      message: true,
    },
  });

  if (messages.length === 0) {
    return '';
  }

  return messages[0].message;
};

export const changeMessage = async (message: string) => {
  const messages = await prisma.message.findMany({
    select: {
      id: true,
      message: true,
    },
  });

  if (messages.length === 0) {
    await prisma.message.create({
      data: {
        message,
      },
    });
  } else {
    await prisma.message.update({
      where: {
        id: messages[0].id,
      },
      data: {
        message,
      },
    });
  }

  revalidatePath('/admin/events');
  revalidatePath('/budget');
};

// EVENTS -------------------------------------

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
        ...(finished ? { lt: new Date() } : { gte: new Date() }),
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
        ...(finished ? { lt: new Date() } : { gte: new Date() }),
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
        title: null as never,
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

  revalidatePath('/next-events');
  revalidatePath('/admin/events');
};

// COMPROMISE -----------------------------------

export const postCompromise = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compromise: /* CreateCompromiseSchema */ any
) => {
  const reason = compromise.reason
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/Ñ/g, 'N');

  await prisma.compromise.create({
    data: {
      reason,
      date: compromise.date,
      time: compromise.time,
    },
  });

  revalidatePath('/next-events');
  revalidatePath('/admin/events');
};

export const deleteCompromise = async (id: string) => {
  await prisma.compromise.delete({
    where: {
      id,
    },
  });

  revalidatePath('/next-events');
  revalidatePath('/admin/events');
};
