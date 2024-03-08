import { cookies } from 'next/headers';

import { postEvent } from '@/utilities/db';

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const authorization = cookies().get('auth');
  if (!authorization) {
    return Response.json(
      {
        data: null,
        message: 'No estás autorizado para realizar esta acción',
      },
      { status: 401 }
    );
  }

  await postEvent(body);
  return Response.json({});
};
