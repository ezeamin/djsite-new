import { cookies } from 'next/headers';

import { prisma } from '@/utilities/prisma';

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  const body = await request.json();
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

  try {
    await prisma.discountCodes.update({
      where: {
        id,
      },
      data: {
        code: body.code,
        discount: body.discount,
      },
    });
  } catch (e) {
    console.error('ERROR UPDATING DISCOUNT CODE', e);
    return Response.json(
      {
        data: null,
        message: 'Ocurrió un error actualizando el código de descuento',
      },
      { status: 500 }
    );
  }

  return Response.json({});
};
