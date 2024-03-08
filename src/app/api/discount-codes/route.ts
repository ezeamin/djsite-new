import { postDiscountCode, validateDiscountCodeBody } from '@/utilities';

export const POST = async (request: Request): Promise<Response> => {
  const body = await request.json();

  const { isValid, message } = validateDiscountCodeBody(body);

  if (!isValid) {
    return Response.json({ data: null, message }, { status: 400 });
  }

  try {
    await postDiscountCode(body.code, body.discount);
  } catch (e) {
    console.error('ERROR POSTING DISCOUNT CODE', e);
    return Response.json(
      {
        data: null,
        message: 'Ocurrió un error generando el código de descuento',
      },
      { status: 500 }
    );
  }

  return Response.json({});
};
