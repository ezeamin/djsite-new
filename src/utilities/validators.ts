import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const validateBudgetBody = (
  body: Record<string, string>
): { isValid: boolean; message?: string } => {
  const { date, time, location, hours, service, discountCode } = body;

  if (!date || !time || !location || !hours || !service) {
    return {
      isValid: false,
      message: 'Revisá la información. Algun campo no está correcto, perdon!',
    };
  }

  // A. Check date to be same or past, in argentina timezone
  const today = dayjs().tz('America/Argentina/Buenos_Aires').startOf('day');
  const selectedDate = dayjs(date)
    .tz('America/Argentina/Buenos_Aires')
    .startOf('day');

  if (selectedDate.isBefore(today)) {
    return {
      isValid: false,
      message:
        'Ups! La fecha del evento no puede ser anterior a hoy (y claro 💁🏼‍♂️)',
    };
  }

  // B. Check time to be "Dia" or "Noche"
  const selectedTime = time.toLowerCase();
  const validTimes = ['dia', 'noche'];
  if (!validTimes.includes(selectedTime.toLowerCase())) {
    return {
      isValid: false,
      message: "Ups! El horario seleccionado no es válido (jajan't)",
    };
  }

  // C. Check hours to be "Menos","4","5","6","Mas"
  const validHours = ['menos', '4', '5', '6', 'mas'];
  if (!validHours.includes(hours.toLowerCase())) {
    return {
      isValid: false,
      message: "Ups! La cantidad de horas seleccionada no es válida (jajan't)",
    };
  }

  //  D. Check service to be "Sonido" or "Parlantes"
  const validServices = ['sonido', 'parlantes'];
  if (!validServices.includes(service.toLowerCase())) {
    return {
      isValid: false,
      message: "Ups! El servicio seleccionado no es válido (jajan't)",
    };
  }

  return { isValid: true };
};
