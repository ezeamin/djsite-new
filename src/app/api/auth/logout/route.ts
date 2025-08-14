import { cookies } from 'next/headers';

export const POST = async (request: Request): Promise<Response> => {
  (await cookies()).delete('auth');

  return Response.json({ data: null, message: 'OK' });
};
