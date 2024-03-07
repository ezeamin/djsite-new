'use server';

import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';

const calculatePrice = ({
  isBasic,
  startColumn,
  data,
  hours,
}: {
  isBasic: boolean;
  startColumn: number;
  data: { values: string[][] };
  hours: string;
}): number => {
  const row = isBasic ? 0 : 1;
  const extraHourRow = 2;

  switch (hours) {
    case 'Menos':
      // Aproximation of 4 hs - 1 extra hour
      return (
        Number.parseInt(data.values[row][startColumn], 10) -
        Number.parseInt(data.values[extraHourRow][startColumn], 10)
      );
    case '4':
      return Number.parseInt(data.values[row][startColumn], 10);
    case '5':
      // Value of 4 hs + 1 extra hour
      return (
        Number.parseInt(data.values[row][startColumn], 10) +
        Number.parseInt(data.values[extraHourRow][startColumn], 10)
      );
    case '6':
      return Number.parseInt(data.values[row][startColumn + 1], 10);
    case 'Mas':
      // Aproximation of 6 hs + 1 extra hour
      return (
        Number.parseInt(data.values[row][startColumn + 1], 10) +
        Number.parseInt(data.values[extraHourRow][startColumn], 10)
      );
    default:
      return 0;
  }
};

export const getPriceFromDB = async (
  formData: BudgetFormSchema,
  distance: number
): Promise<number> => {
  const { SHEET_ID, GOOGLE_MATRIX_API_KEY } = process.env;
  const dataRange = 'B3:G5';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${dataRange}?key=${GOOGLE_MATRIX_API_KEY}`;

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
      });
    case '10km':
      return calculatePrice({
        isBasic,
        startColumn: 2,
        data,
        hours: formData.hours,
      });
    case '20km':
      return calculatePrice({
        isBasic,
        startColumn: 4,
        data,
        hours: formData.hours,
      });
    default:
      return 0;
  }
};
