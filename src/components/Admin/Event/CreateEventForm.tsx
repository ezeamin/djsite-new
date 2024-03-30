'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import StartAndEndForm from './StartAndEndForm';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';

import { useZodForm } from '@/hooks';

import DateAndTimeForm from '@/components/Budget/DateAndTimeForm';
import LocationForm from '@/components/Budget/LocationForm';
import ServiceForm from '@/components/Budget/ServiceForm';
import LoadingBackdrop from '@/components/Loading/LoadingBackdrop';
import TextAreaInput from '@/components/ui/TextAreaInput/TextAreaInput';
import TextInput from '@/components/ui/TextInput/TextInput';

import { PATHS } from '@/constants/paths';
import { postEvent, putEvent } from '@/utilities';

import {
  CreateEventSchema,
  createEventSchema,
} from '@/forms/schemas/createEventSchema';

import { koulen } from '@/styles/fonts';

import { CreateEventFormProps } from '@/components/interface/admin';

const CreateEventForm = (props: CreateEventFormProps) => {
  const { eventToModify } = props;

  const isModifying = !!eventToModify;

  const router = useRouter();

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

    let eventId;
    if (isModifying) eventId = await putEvent(formData, eventToModify.id);
    else eventId = await postEvent(formData);

    setIsLoading(false);

    if (!eventId) {
      toast.error(
        isModifying
          ? 'Error al actualizar el evento'
          : 'Error al crear el evento'
      );
      return;
    }

    toast.success(
      isModifying ? 'Evento modificado con éxito' : 'Evento creado con éxito'
    );
    router.push(PATHS.ADMIN.EVENTS);
  };

  // ---------------------------------------
  // EFFECTS
  // ---------------------------------------

  useEffect(() => {
    if (eventToModify) {
      Object.keys(eventToModify).forEach((key) => {
        // TODO: Date not being set
        setValue(
          key as keyof CreateEventSchema,
          eventToModify[key as keyof CreateEventSchema]
        );
      });
    }
  }, [eventToModify, setValue]);

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
      <StartAndEndForm control={control} name="time" />
      <LocationForm
        hideHelp
        control={control}
        name="location"
        setValue={setValue}
      />
      <ServiceForm hideHelp control={control} name="service" />
      <div className="divider my-1 before:bg-gray-400/25 after:bg-gray-400/25" />
      <TextInput
        className="w-full"
        control={control}
        label="Cliente"
        name="clientName"
        type="text"
      />
      <TextInput
        className="w-full"
        control={control}
        label="Teléfono"
        name="clientPhone"
        type="text"
      />
      <div className="divider my-1 before:bg-gray-400/25 after:bg-gray-400/25" />
      <TextInput
        className="w-full"
        control={control}
        label="Precio"
        name="price"
        type="number"
      />
      <TextInput
        className="w-full"
        control={control}
        label="Pagado"
        name="paid"
        type="number"
      />
      <div className="divider my-1 before:bg-gray-400/25 after:bg-gray-400/25" />
      <TextAreaInput
        className="w-full"
        control={control}
        label="Observaciones"
        name="observations"
        type="text"
      />
      <button
        className={`${areAllFieldsFilled ? 'three-d-button--red' : 'bg-gray-300'} btn mt-2 border-0 text-xl transition-colors ${koulen.className}`}
        disabled={!areAllFieldsFilled}
        type="submit"
      >
        GUARDAR
      </button>
    </form>
  );
};
export default CreateEventForm;
