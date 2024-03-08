'use server';

import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';

const calculatePrice = ({
  isBasic,
  startColumn,
  data,
  hours,
  discount,
}: {
  isBasic: boolean;
  startColumn: number;
  data: { values: string[][] };
  hours: string;
  discount: number | null;
}): number => {
  const row = isBasic ? 0 : 1;
  const extraHourRow = 2;

  let price = 0;

  switch (hours) {
    case 'Menos':
      // Aproximation of 4 hs - 1 extra hour
      price =
        Number.parseInt(data.values[row][startColumn], 10) -
        Number.parseInt(data.values[extraHourRow][startColumn], 10);
      break;
    case '4':
      price = Number.parseInt(data.values[row][startColumn], 10);
      break;
    case '5':
      // Value of 4 hs + 1 extra hour
      price =
        Number.parseInt(data.values[row][startColumn], 10) +
        Number.parseInt(data.values[extraHourRow][startColumn], 10);
      break;
    case '6':
      price = Number.parseInt(data.values[row][startColumn + 1], 10);
      break;
    case 'Mas':
      // Aproximation of 6 hs + 1 extra hour
      price =
        Number.parseInt(data.values[row][startColumn + 1], 10) +
        Number.parseInt(data.values[extraHourRow][startColumn], 10);
      break;
    default:
      price = 0;
  }

  if (discount) {
    price -= price * (discount / 100);
  }

  if (price < 0) {
    return 0;
  }

  return price;
};

export const getPriceFromDB = async (
  formData: BudgetFormSchema,
  distance: number,
  discount: number | null
): Promise<number> => {
  const { SHEET_ID, GOOGLE_MATRIX_API_KEY } = process.env;
  const dataRange = 'B3:G5';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${dataRange}?key=${GOOGLE_MATRIX_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data || data.error) {
      return 0;
    }

    const isBasic = formData.service === 'Basico';
    let distanceRange = '';
    if (distance < 5) {
      distanceRange = '5km';
    } else if (distance < 10) {
      distanceRange = '10km';
    } else {
      distanceRange = '20km';
    }

    switch (distanceRange) {
      case '5km':
        return calculatePrice({
          isBasic,
          startColumn: 0,
          data,
          hours: formData.hours,
          discount,
        });
      case '10km':
        return calculatePrice({
          isBasic,
          startColumn: 2,
          data,
          hours: formData.hours,
          discount,
        });
      case '20km':
        return calculatePrice({
          isBasic,
          startColumn: 4,
          data,
          hours: formData.hours,
          discount,
        });
      default:
        return 0;
    }
  } catch (e) {
    console.error('ERROR GETTING PRICE FROM GSHEETS', e);
    return 0;
  }
};
