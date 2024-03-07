import {
  calculateDistance,
  sendPingMail,
  validateBudgetBody,
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

  // Get IP
  const ip =
    request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
  const userAgent = request.headers.get('user-agent');
  sendPingMail({ formData: body, price: 8000, distance, ip, userAgent });

  return Response.json({ data: { price: 8000, distance }, message: null });
};
