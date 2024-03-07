import { postEvent } from '@/utilities/db';

const mockData = {
  id: '1',
  title: 'Cumpleaños de Juan',
  date: new Date(),
  time: 'Dia',
  startTime: '10:00',
  endTime: '18:00',
  location: 'Casa de Juan',
  service: 'Basico',
  price: 10000,
  paid: 1000,
  observations: '',
  client: {
    name: 'Juan',
    phone: '3811234567',
  },
};

export const POST = async (req: Request): Promise<Response> => {
  await postEvent(mockData);

  return Response.json({});
};
