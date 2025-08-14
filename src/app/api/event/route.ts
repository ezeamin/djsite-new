import { cookies } from 'next/headers';

import { postEvent } from '@/utilities/db';

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const authorization = (await cookies()).get('auth');
  if (!authorization) {
    return Response.json(
      {
        data: null,
        message: 'No estás autorizado para realizar esta acción',
      },
      { status: 401 }
    );
  }

  const result = await postEvent(body);

  if (!result) {
    return Response.json(
      {
        data: null,
        message: 'No se pudo crear el evento',
      },
      { status: 500 }
    );
  }

  return Response.json({
    data: result,
    message: 'Evento creado correctamente',
  });
};
