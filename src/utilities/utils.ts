import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import UAParser from 'ua-parser-js';

import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';

import { Compromise, Event, MinimalEvent } from '@/interface';

/**
 * Usage with template literals. To call the function, do not use parentheses.
 * @param strings
 * @param values
 * @returns {string}
 */
export const removeLineBreaks = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  let result = '';

  for (let i = 0; i < strings.length; i += 1) {
    result += strings[i];
    if (i < values.length) {
      result += values[i];
    }
  }

  // Remove line breaks and extra spaces
  result = result.replace(/\s+/g, ' ');

  return result;
};

export const calculateDistance = async (location: string): Promise<number> => {
  const origin = 'Zavalia 1,Yerba Buena,Tucuman';

  const originEncoded = encodeURI(origin);
  const destination = encodeURI(location);

  const API_KEY = process.env.GOOGLE_MATRIX_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${originEncoded}&key=${API_KEY}`;

  try {
    const body = await fetch(url, {
      headers: {
        'User-Agent': 'node.js',
      },
    });
    const data = await body.json();

    let result = data.rows[0].elements[0].distance.text.split(' ')[0];
    if (result.includes(',')) result = result.replace(',', '');

    const value = Number.parseFloat(result);

    return value;
  } catch (e) {
    console.error('ERROR CALCULATING DISTANCE', e);
    return 0;
  }
};

export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const buildLocationMap = (location: string): string => {
  const encodedLoc = location.replaceAll(' ', '+');

  return `https://www.google.com/maps/place/${encodedLoc}`;
};

export const buildNavigationLink = (location: string): string => {
  const encodedLoc = location.replaceAll(' ', '+');

  return `https://www.google.com/maps/dir/?api=1&destination=${encodedLoc}`;
};

export const generateEventData = ({
  formData,
  price,
  distance,
  discount,
}: {
  formData: BudgetFormSchema;
  price: number;
  distance: number;
  discount: number | null;
}): string => {
  const formattedDate = dayjs(formData.date).format('DD/MM/YYYY');

  return `*Fecha*: ${formattedDate}
  *Turno*: ${formData.time}
  *Ubicación*: ${formData.location} (${distance}km)
  *Tiempo*: ${formData.hours} horas
  *Servicio*: ${formData.service}

El presupuesto es de: *$${formatPrice(price)}* ${discount ? `(descuento aplicado del ${discount}%: ${formData.discountCode})` : ''}\n\n`;
};

export const generateEventMailData = ({
  formData,
  price,
  distance,
  discount,
  ip,
  userAgent,
}: {
  formData: BudgetFormSchema;
  price: number;
  distance: number;
  discount: number | null;
  ip: string | null;
  userAgent: string | null;
}): string => {
  const formattedDate = dayjs(formData.date).format('DD/MM/YYYY');
  const formattedPrice = formatPrice(price);
  const formattedIp = ip || 'N/A';

  const weekDay = dayjs(formData.date).locale('es').format('dddd');

  const parser = new UAParser(userAgent || '');
  const device = parser.getDevice();
  const browser = parser.getBrowser().name || 'N/A';
  const os = parser.getOS().name || 'N/A';

  return `<main style="box-sizing: border-box; font-family: Arial; display: flex; flex-direction: column; justify-content: center">
  <p>El presupuesto es de</p>
  <p style="text-align: center; font-weight: bold; font-size: 2rem; margin-top: 0.25rem">
    $${formattedPrice}
  </p>
  <table style="border-collapse: collapse; width: 100%; max-width: 500px; margin-bottom: 1rem;">
    <tbody>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          Fecha
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          ${weekDay} ${formattedDate}
        </td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          Turno
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          ${formData.time}
        </td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          Ubicación
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          <a href=${buildLocationMap(formData.location)}>
          ${formData.location}
          </a> (${distance}km)
        </td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          Tiempo
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          ${formData.hours} horas
        </td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          Servicio
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          ${formData.service}
        </td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          Código de descuento
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          ${formData.discountCode ? `${formData.discountCode.toUpperCase()} ${discount ? `- ✅ ${discount}%` : '- ❌'}` : 'N/A'}
        </td>
      </tr>
    </tbody>
  </table>
  <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
    <tbody>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          IP
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">${formattedIp}</td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          Navegador
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">${browser}</td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          OS
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">${os}</td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
            width: 135px;
          "
        >
          Dispositivo
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          ${device.vendor ? `${device.vendor || ''} ${device.model || ''} (${device.type || ''})` : 'N/A'}
        </td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 0.75rem">${userAgent}</p>
</main>
`;
};

const sendWhatsappMessage = async (
  formData: BudgetFormSchema,
  price: number,
  distance: number,
  discount: number | null
) => {
  const { value: name } = await Swal.fire({
    title: 'Ingresá tu nombre',
    input: 'text',
    inputLabel: 'Nombre',
    showCancelButton: true,
    confirmButtonColor: '#77dd77',
    cancelButtonColor: '#8d8d8d',
    confirmButtonText: 'Continuar a WhatsApp 😎',
    cancelButtonText: 'Cancelar 🥺',
    inputValidator: (value): string | undefined => {
      if (!value.trim()) {
        return 'Por favor, escribí tu nombre';
      }
      return undefined;
    },
  });

  if (!name) return;

  const text = `Hola Eze! Soy ${name} y quiero presupuestar la siguiente fiesta:
  ${generateEventData({ formData, price, distance, discount })}`;

  const encodedText = encodeURI(text);
  const encodedLink = buildLocationMap(formData.location).replaceAll(
    '+',
    '%2B'
  );

  const url = `https://wa.me/+5493815038570?text=${encodedText + encodedLink}`;
  window.open(url, '_blank')?.focus();
};

export const manageBudgetResponse = async (
  formData: BudgetFormSchema,
  res: Response,
  data: {
    data: { price: number; distance: number; discount: number | null } | null;
    message: string;
  }
) => {
  if (!res.ok) {
    toast.warning(data.message || 'Ocurrió un error desconocido. Perdon! 😔');
    return;
  }

  if (res.status === 200 && !data.data) {
    const action = await Swal.fire({
      title: '😀🔫',
      html: data.message,
      showCancelButton: true,
      confirmButtonColor: '#395aa8',
      confirmButtonText: 'Okis, mandar WhatsApp 📲',
      cancelButtonText: 'No gracias, soy aburrido 😔',
    });
    if (action.isConfirmed) {
      window.open(process.env.NEXT_PUBLIC_CONTACT_LINK, '_blank');
    }

    return;
  }

  if (!data.data) {
    toast.error('Ups! Algo salió mal. Por favor, intentá de nuevo.');
    return;
  }

  const price = data.data?.price;
  const distance = data.data?.distance;
  const discount = data.data?.discount;

  const discountBadge = formData.discountCode
    ? `${discount ? `<div class="mb-2 badge badge-success text-white">Descuento del ${discount}% aplicado 🎉</div>` : '<div class="mb-2 badge badge-warning text-white">Código de descuento no válido 💨</div>'}`
    : '';

  const action = await Swal.fire({
    title: `$${formatPrice(price)} 😉`,
    html: `<div>${discountBadge}<p>Este es el presupuesto <b>ESTIMADO</b> para tu evento.</p><br/><p>¿Te gustaría reservar la fecha?</p><p>(Te voy a llevar a mi WhatsApp)</b></div>`,
    showCancelButton: true,
    confirmButtonText: 'Sip, ir a WhatsApp! 📲',
    cancelButtonText: 'No gracias, soy aburrido 😔',
    confirmButtonColor: '#395aa8',
    footer: `<p class="text-center -my-2">Es importante leer los&nbsp;<a href="/terms-and-conditions" target="_blank" class="mb-0 form__swal__link">términos y condiciones</a> (porfa)</p>`,
  });

  if (action.isConfirmed) {
    sendWhatsappMessage(formData, price!, distance, discount);
  }
};

export const sortEvents = (
  a: Event | Compromise | MinimalEvent,
  b: Event | Compromise | MinimalEvent
) => {
  // sort by date and by time ("Dia" should come before "Noche")
  const dateDiff = a.date.getTime() - b.date.getTime();

  if (dateDiff === 0) {
    if (a.time === b.time) return 0;
    if (a.time === 'Dia') return -1;
    return 1;
  }

  return dateDiff;
};

export const getAmountOfHours = ({
  date,
  start,
  end,
}: {
  date: Date;
  start: string;
  end: string;
}) => {
  const day = dayjs(date).format('YYYY-MM-DD');
  const isNextDay = end < start;
  const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD');

  const startTime = dayjs(`${day}T${start}`);
  const endTime = dayjs(`${isNextDay ? nextDay : day}T${end}`);

  const diff = endTime.diff(startTime, 'hour');

  return diff;
};

export const getEmoji = (type: 'event' | 'compromise') => {
  const icons = ['🥳', '🎉', '🪅', '🎆', '🎈'];

  return icons[Math.floor(Math.random() * icons.length)];
};
