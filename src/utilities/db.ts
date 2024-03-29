'use server';

import { revalidatePath } from 'next/cache';

import { createCalendarEvent, deleteCalendarEvent } from './google';
import { prisma } from './prisma';
import { sortEvents } from './utils';

import { CreateCompromiseSchema } from '@/forms/schemas/createCompromiseSchema';
import { CreateEventSchema } from '@/forms/schemas/createEventSchema';

import { Compromise, Event, MinimalEvent } from '@/interface';

// COMMON -------------------------------------

export const getBusyDates = async () => {
  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: `${new Date().toISOString().split('T')[0]}T00:00:00.000Z`,
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
        gte: `${new Date().toISOString().split('T')[0]}T00:00:00.000Z`,
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

// MESSAGE -------------------------------------

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

// DISCOUNTS -------------------------------------

export const validateDiscount = async (code: string) => {
  const discount = await prisma.discountCodes.findFirst({
    where: {
      code: code.toUpperCase(),
    },
    select: {
      discount: true,
    },
  });

  if (discount?.discount) return discount.discount;
  return null;
};

export const getDiscountCodes = async () => {
  const discountCodes = await prisma.discountCodes.findMany({
    select: {
      id: true,
      code: true,
      discount: true,
    },
  });

  return discountCodes;
};

export const getDiscountCode = async (id: string | undefined) => {
  if (!id) return null;

  const discountCodes = await prisma.discountCodes.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      code: true,
      discount: true,
    },
  });

  return discountCodes;
};

export const postDiscountCode = async (code: string, discount: number) => {
  await prisma.discountCodes.create({
    data: {
      code: code.toUpperCase(),
      discount,
    },
  });

  revalidatePath('/admin/discount-codes');
};

export const deleteDiscountCode = async (id: string) => {
  await prisma.discountCodes.delete({
    where: {
      id,
    },
  });

  revalidatePath('/admin/discount-codes');
};

// EVENTS -------------------------------------

export const getEvents = async ({
  finished,
  fullData = false,
}: {
  finished: boolean;
  fullData: boolean;
}): Promise<(Event | Compromise | MinimalEvent)[]> => {
  const dateFilter = finished
    ? {
        lt: `${new Date().toISOString().split('T')[0]}T00:00:00.000Z`,
      }
    : {
        gte: `${new Date().toISOString().split('T')[0]}T00:00:00.000Z`,
      };

  const eventsPromise = prisma.event.findMany({
    where: {
      date: {
        ...dateFilter,
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
    orderBy: [
      {
        date: 'desc',
      },
      {
        time: 'asc',
      },
    ],
  });

  const compromisesPromise = prisma.compromise.findMany({
    where: {
      date: {
        ...dateFilter,
      },
    },
    orderBy: [
      {
        date: 'desc',
      },
    ],
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

    const data = [...minimalEvents, ...minimalCompromises].sort((a, b) =>
      sortEvents(a, b, finished)
    );

    return data;
  }

  const data = [...events, ...compromises].sort((a, b) =>
    sortEvents(a, b, finished)
  );

  return data;
};

export const getEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
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

  return event;
};

export const postEvent = async (event: CreateEventSchema) => {
  const phone = `+549${event.clientPhone}`;

  // replace ñ and accents
  const title = event.title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/Ñ/g, 'N');

  const calendarEventId = await createCalendarEvent({
    ...event,
    date: event.date as unknown as Date,
    client: { name: event.clientName, phone },
  });

  if (!calendarEventId) {
    return null;
  }

  const createdData = await prisma.event.create({
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
      id_calendar_event: calendarEventId,
      client: {
        create: {
          name: event.clientName,
          phone,
        },
      },
    },
  });

  revalidatePath('/next-events');
  revalidatePath('/admin/events');

  return createdData.id;
};

export const putEvent = async (event: CreateEventSchema, id: string) => {
  const phone = `+549${event.clientPhone}`;

  // replace ñ and accents
  const title = event.title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/Ñ/g, 'N');

  // TODO: update calendar event
  // const calendarEventId = await createCalendarEvent({
  //   ...event,
  //   date: event.date as unknown as Date,
  //   client: { name: event.clientName, phone },
  // });

  // if (!calendarEventId) {
  //   return null;
  // }

  await prisma.event.update({
    where: {
      id,
    },
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
      // id_calendar_event: calendarEventId,
      client: {
        update: {
          name: event.clientName,
          phone,
        },
      },
    },
  });

  revalidatePath('/next-events');
  revalidatePath('/admin/events');

  return id;
};

export const deleteEvent = async (id: string) => {
  await prisma.event.delete({
    where: {
      id,
    },
  });

  await deleteCalendarEvent(id);

  revalidatePath('/next-events');
  revalidatePath('/admin/events');
};

// COMPROMISE -----------------------------------

export const postCompromise = async (compromise: CreateCompromiseSchema) => {
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
