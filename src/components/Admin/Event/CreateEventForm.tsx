'use client';

import { useState } from 'react';

import { createPortal } from 'react-dom';

import { useZodForm } from '@/hooks';

import DateAndTimeForm from '@/components/Budget/DateAndTimeForm';
import LocationForm from '@/components/Budget/LocationForm';
import ServiceForm from '@/components/Budget/ServiceForm';
import LoadingBackdrop from '@/components/Loading/LoadingBackdrop';
import TextInput from '@/components/ui/TextInput/TextInput';

import {
  CreateEventSchema,
  createEventSchema,
} from '@/forms/schemas/createEventSchema';

import { koulen } from '@/styles/fonts';

import { CreateEventFormProps } from '@/components/interface/admin';

const CreateEventForm = (props: CreateEventFormProps) => {
  const { eventToModify } = props;

  const { control, onSubmitMiddleware, setValue, watch } =
    useZodForm(createEventSchema);

  const [isLoading, setIsLoading] = useState(false);

  const date = watch('date');
  const time = watch('time');
  const location = watch('location');
  const service = watch('service');
  const areAllFieldsFilled = date && time && location && service;

  // ---------------------------------------
  // HANDLERS
  // ---------------------------------------

  const handleSubmit = async (formData: CreateEventSchema) => {
    setIsLoading(true);

    // Change this to Server Action

    // const res = await fetch('/api/event', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const data = await res.json();

    setIsLoading(false);

    // manageBudgetResponse(formData, res, data);
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
      <TextInput
        className="w-full"
        control={control}
        label="Título"
        maxLength={20}
        name="title"
        placeholder="Cumple Juan"
      />
      <DateAndTimeForm<CreateEventSchema>
        // @ts-expect-error -- help me
        control={control}
        // @ts-expect-error -- this is awful
        watch={watch}
      />
      {/* Hours */}
      <LocationForm control={control} name="location" setValue={setValue} />
      <ServiceForm<CreateEventSchema> control={control} name="service" />
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
export default CreateEventForm;
