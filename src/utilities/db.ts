'use server';

import { prisma } from './prisma';

import { Event } from '@/interface';

export const getEvents = async ({
  finished,
}: {
  finished: boolean;
}): Promise<Event[]> => {
  const data = await prisma.event.findMany({
    where: {
      finished,
    },
  });

  return data;
};

export const postEvent = async (event: Event) => {
  await prisma.event.create({
    data: event,
  });
};
