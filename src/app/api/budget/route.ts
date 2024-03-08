import {
  calculateDistance,
  getPriceFromDB,
  sendPingMail,
  validateBudgetBody,
  validateDiscount,
} from '@/utilities';

export const POST = async (request: Request): Promise<Response> => {
  const body = await request.json();

  const {
    isValid,
    message = 'Revisá la información. Algo no está correcto, perdon!',
  } = validateBudgetBody(body);

  if (!isValid) {
    Response.json({ data: null, message }, { status: 400 });
  }

  const distance = await calculateDistance(body.location);

  if (distance === 0) {
    return Response.json(
      {
        data: null,
        message:
          'Ups! No pude calcular la distancia hasta tu ubicación, perdon! 🥺',
      },
      { status: 500 }
    );
  }

  if (distance > 20) {
    return Response.json(
      {
        data: null,
        message:
          'Ups! La distancia es mayor a 20km, y no cuento con presupuesto fijo para llegar tan lejos.<br />¡Mandame un mensaje! ',
      },
      { status: 200 }
    );
  }

  const discount = await validateDiscount(body.discountCode);
  const price = await getPriceFromDB(body, distance, discount);

  if (price === 0) {
    return Response.json(
      {
        data: null,
        message:
          'Ups! No pude calcular el presupuesto (algo se rompió), perdon! 🥺',
      },
      { status: 500 }
    );
  }

  // Send mail
  const ip =
    request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
  const userAgent = request.headers.get('user-agent');
  if (process.env.NODE_ENV === 'production')
    await sendPingMail({
      formData: body,
      price,
      distance,
      discount,
      ip,
      userAgent,
    });

  return Response.json({
    data: { price, distance, discount },
    message: null,
  });
};
