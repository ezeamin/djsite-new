'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';
import { toast } from 'sonner';

import { useZodForm } from '@/hooks';

import DateAndTimeForm from '@/components/Budget/DateAndTimeForm';
import LoadingBackdrop from '@/components/Loading/LoadingBackdrop';
import TextInput from '@/components/ui/TextInput/TextInput';

import { PATHS } from '@/constants/paths';
import { postCompromise, putCompromise } from '@/utilities';

import {
  CreateCompromiseSchema,
  createCompromiseSchema,
} from '@/forms/schemas/createCompromiseSchema';

import { koulen } from '@/styles/fonts';

import { CreateCompromiseFormProps } from '@/components/interface/admin';

const CreateCompromiseForm = (props: CreateCompromiseFormProps) => {
  const { compromiseToModify } = props;

  const isModifying = !!compromiseToModify;

  const router = useRouter();

  const { control, onSubmitMiddleware, setValue, watch } = useZodForm(
    createCompromiseSchema
  );

  const [isLoading, setIsLoading] = useState(false);

  const date = watch('date');
  const time = watch('time');
  const areAllFieldsFilled = date && time;

  // ---------------------------------------
  // HANDLERS
  // ---------------------------------------

  const handleSubmit = async (formData: CreateCompromiseSchema) => {
    setIsLoading(true);

    let compromiseId;
    if (isModifying)
      compromiseId = await putCompromise(formData, compromiseToModify.id);
    else compromiseId = await postCompromise(formData);

    setIsLoading(false);

    if (!compromiseId) {
      toast.error(
        isModifying
          ? 'Error al actualizar el compromiso'
          : 'Error al crear el compromiso'
      );
      return;
    }

    toast.success(
      isModifying
        ? 'Compromiso modificado con éxito'
        : 'Compromiso creado con éxito'
    );
    router.push(PATHS.ADMIN.EVENTS);
  };

  // ---------------------------------------
  // EFFECTS
  // ---------------------------------------

  useEffect(() => {
    if (compromiseToModify) {
      Object.keys(compromiseToModify).forEach((key) => {
        // TODO: Date not being set
        setValue(
          key as keyof CreateCompromiseSchema,
          compromiseToModify[key as keyof CreateCompromiseSchema]
        );
      });
    }
  }, [compromiseToModify, setValue]);

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
        label="Razón"
        maxLength={20}
        name="reason"
        placeholder="Cumple Juan"
      />
      <DateAndTimeForm<CreateCompromiseSchema>
        // @ts-expect-error -- help me
        control={control}
        // @ts-expect-error -- this is awful
        watch={watch}
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
export default CreateCompromiseForm;
