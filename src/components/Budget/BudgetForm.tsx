'use client';

import { useState } from 'react';

import LoadingBackdrop from '../Loading/LoadingBackdrop';
import DateInput from '../ui/DateInput/DateInput';
import HoursForm from './HoursForm';
import LocationForm from './LocationForm';
import ServiceForm from './ServiceForm';
import TimeForm from './TimeForm';
import { createPortal } from 'react-dom';

import { useZodForm } from '@/hooks';

import { manageBudgetResponse } from '@/utilities';

import {
  BudgetFormSchema,
  budgetFormSchema,
} from '@/forms/schemas/budgetFormSchema';

import { koulen } from '@/styles/fonts';

const BudgetForm = () => {
  const { control, onSubmitMiddleware, areAllFieldsFilled, setValue } =
    useZodForm(budgetFormSchema);

  const [isLoading, setIsLoading] = useState(false);

  // ---------------------------------------
  // HANDLERS
  // ---------------------------------------

  const handleSubmit = async (formData: BudgetFormSchema) => {
    setIsLoading(true);

    const res = await fetch('/api/budget', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    setIsLoading(false);

    manageBudgetResponse(formData, res, data);
  };

  // ---------------------------------------
  // RENDER
  // ---------------------------------------

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      {isLoading && createPortal(<LoadingBackdrop open />, document.body)}
      <DateInput
        control={control}
        label="Fecha"
        name="date"
        placeholder="dd/mm/aaaa"
      />
      <TimeForm<BudgetFormSchema> control={control} name="time" />
      <LocationForm control={control} name="location" setValue={setValue} />
      <HoursForm<BudgetFormSchema> control={control} name="hours" />
      <ServiceForm<BudgetFormSchema> control={control} name="service" />
      <button
        className={`${areAllFieldsFilled ? 'three-d-button--red' : 'bg-gray-300'} btn mt-2 border-0 text-xl transition-colors ${koulen.className}`}
        disabled={!areAllFieldsFilled}
        type="submit"
      >
        CALCULAR
      </button>
    </form>
  );
};
export default BudgetForm;
