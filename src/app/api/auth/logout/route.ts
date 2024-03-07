import { cookies } from 'next/headers';

export const POST = (request: Request): Response => {
  cookies().delete('auth');

  return Response.json({ data: null, message: 'OK' });
};
