'use client';

import DateInput from '../ui/DateInput/DateInput';
import HoursForm from './HoursForm';
import LocationForm from './LocationForm';
import ServiceForm from './ServiceForm';
import TimeForm from './TimeForm';

import { useZodForm } from '@/hooks';

import {
  BudgetFormSchema,
  budgetFormSchema,
} from '@/forms/schemas/budgetFormSchema';

import { koulen } from '@/styles/fonts';

const BudgetForm = () => {
  const { control, onSubmitMiddleware, areAllFieldsFilled, setValue } =
    useZodForm(budgetFormSchema);

  // ---------------------------------------
  // HANDLERS
  // ---------------------------------------

  const handleSubmit = (data: BudgetFormSchema) => {
    console.log('handleSubmit', data);
  };

  // ---------------------------------------
  // RENDER
  // ---------------------------------------

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <DateInput
        control={control}
        label="Fecha"
        name="date"
        placeholder="dd/mm/aaaa"
      />
      <TimeForm control={control} />
      <LocationForm control={control} name="location" setValue={setValue} />
      <HoursForm control={control} />
      <ServiceForm control={control} />
      <button
        className={`${areAllFieldsFilled ? 'three-d-button--selected' : 'bg-gray-300'} btn mt-2 border-0 text-xl transition-colors ${koulen.className}`}
        disabled={!areAllFieldsFilled}
        type="submit"
      >
        CALCULAR
      </button>
    </form>
  );
};
export default BudgetForm;
