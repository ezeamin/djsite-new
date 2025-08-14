import { cookies } from 'next/headers';

import { deleteEvent } from '@/utilities';

export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  const { id } = await params;

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

  await deleteEvent(id);
  return Response.json({});
};
