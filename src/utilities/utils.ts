import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import UAParser from 'ua-parser-js';

import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';

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

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${originEncoded}&key=${API_KEY}`;

  const body = await fetch(url, {
    headers: {
      'User-Agent': 'node.js',
    },
  });
  const data = await body.json();
  // console.log(data);

  try {
    let result = data.rows[0].elements[0].distance.text.split(' ')[0];
    if (result.includes(',')) result = result.replace(',', '');

    const value = Number.parseFloat(result);

    return value;
  } catch (e) {
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

export const generateEventData = ({
  formData,
  price,
  distance,
}: {
  formData: BudgetFormSchema;
  price: number;
  distance: number;
}): string => {
  const formattedDate = dayjs(formData.date).format('DD/MM/YYYY');

  return `*Fecha*: ${formattedDate}
  *Turno*: ${formData.time}
  *Ubicación*: ${formData.location} (${distance}km)
  *Tiempo*: ${formData.hours} horas
  *Servicio*: ${formData.service}

El presupuesto es de: *$${formatPrice(price)}*\n\n`;
};

export const generateEventMailData = ({
  formData,
  price,
  distance,
  ip,
  userAgent,
}: {
  formData: BudgetFormSchema;
  price: number;
  distance: number;
  ip: string | null;
  userAgent: string | null;
}): string => {
  const formattedDate = dayjs(formData.date).format('DD/MM/YYYY');
  const formattedPrice = formatPrice(price);
  const formattedIp = ip || 'N/A';

  const parser = new UAParser(userAgent || '');
  const device = parser.getDevice().type || 'N/A';
  const browser = parser.getBrowser().name || 'N/A';
  const os = parser.getOS().name || 'N/A';

  return `<main style="font-family: Arial">
  <p>
    El presupuesto es de
    <b>$${formattedPrice}</b>
  </p>
  <table style="border-collapse: collapse; width: 100%; max-width: 500px; margin-bottom: 1rem;">
    <tbody>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
          "
        >
          Fecha
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          ${formattedDate}
        </td>
      </tr>
      <tr>
        <td
          style="
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            padding: 0.5rem;
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
          "
        >
          Servicio
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">
          ${formData.service}
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
          "
        >
          Dispositivo
        </td>
        <td style="border: 1px solid #ccc; padding: 0.5rem">${device}</td>
      </tr>
    </tbody>
  </table>
</main>
`;
};

const sendWhatsappMessage = async (
  formData: BudgetFormSchema,
  price: number,
  distance: number
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
  ${generateEventData({ formData, price, distance })}`;

  const encodedText = encodeURI(text);
  const encodedLink = buildLocationMap(formData.location);

  const url = `https://wa.me/+5493815038570?text=${encodedText + encodedLink}`;
  window.open(url, '_blank')?.focus();
};

export const manageBudgetResponse = async (
  formData: BudgetFormSchema,
  res: Response,
  data: { data: { price: number; distance: number } | null; message: string }
) => {
  if (!res.ok) {
    toast.warning(data.message);
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
  const action = await Swal.fire({
    title: `$${formatPrice(price)} 😉`,
    html: '<p>Este es el presupuesto <b>ESTIMADO</b> para tu evento.</p><br/><p>¿Te gustaría reservar la fecha?</p><p>(Te voy a llevar a mi WhatsApp)</b>',
    showCancelButton: true,
    confirmButtonText: 'Sip, ir a WhatsApp! 📲',
    cancelButtonText: 'No gracias, soy aburrido 😔',
    confirmButtonColor: '#395aa8',
    footer: `<p class="text-center -my-2">Es importante leer los&nbsp;<a href="https://bit.ly/tyc-djezeamin-1" target="_blank" class="mb-0 form__swal__link">terminos y condiciones</a> (porfa)</p>`,
  });

  if (action.isConfirmed) {
    sendWhatsappMessage(formData, price!, distance);
  }
};
