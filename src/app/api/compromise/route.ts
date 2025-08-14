import { cookies } from 'next/headers';

import { postCompromise } from '@/utilities';

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

  await postCompromise(body);
  return Response.json({});
};
