'use client';

import { useState } from 'react';

import LoadingBackdrop from '../Loading/LoadingBackdrop';
import DateAndTimeForm from './DateAndTimeForm';
import HoursForm from './HoursForm';
import LocationForm from './LocationForm';
import ServiceForm from './ServiceForm';
import { createPortal } from 'react-dom';

import { useZodForm } from '@/hooks';

import { manageBudgetResponse } from '@/utilities';

import {
  BudgetFormSchema,
  budgetFormSchema,
} from '@/forms/schemas/budgetFormSchema';

import { koulen } from '@/styles/fonts';

import { BudgetFormProps } from '../interface/budget';

const BudgetForm = (props: BudgetFormProps) => {
  const { busyDates } = props;

  const { control, onSubmitMiddleware, areAllFieldsFilled, setValue, watch } =
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
      <DateAndTimeForm<BudgetFormSchema>
        busyDates={busyDates}
        control={control}
        watch={watch}
      />
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
