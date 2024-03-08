'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { createPortal } from 'react-dom';
import { toast } from 'sonner';

import { useZodForm } from '@/hooks';

import LoadingBackdrop from '@/components/Loading/LoadingBackdrop';
import Grid from '@/components/ui/Grid/Grid';
import TextInput from '@/components/ui/TextInput/TextInput';

import { PATHS } from '@/constants/paths';

import {
  DiscountCodesSchema,
  discountCodesSchema,
} from '@/forms/schemas/discountCodesSchema';

import { koulen } from '@/styles/fonts';

import { DiscountCodeFormProps } from '@/components/interface/admin';

const DiscountCodeForm = (props: DiscountCodeFormProps) => {
  const { discountCode } = props;

  const isEditing = useMemo(
    () => !!(discountCode && discountCode.id),
    [discountCode]
  );

  const { onSubmitMiddleware, control, areAllFieldsFilled, setValue, reset } =
    useZodForm(discountCodesSchema);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // -----------------------------------------------------
  // HANDLERS
  // -----------------------------------------------------

  const handleSubmit = async (formData: DiscountCodesSchema) => {
    setIsLoading(true);

    const res = await fetch(
      `/api/discount-codes${isEditing && discountCode ? `/${discountCode.id}` : ''}`,
      {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();

    setIsLoading(false);

    if (res.ok) {
      const msg = isEditing
        ? 'Código modificado correctamente'
        : 'Código cargado correctamente';
      toast.success(msg);
      router.refresh();
    } else {
      toast.error(data.message);
    }
  };

  const handleCancel = () => {
    reset();
    router.push(PATHS.ADMIN.DISCOUNT_CODES);
  };

  // -----------------------------------------------------
  // EFFECTS
  // -----------------------------------------------------

  useEffect(() => {
    if (isEditing && discountCode) {
      setValue('code', discountCode.code);
      setValue('discount', discountCode.discount);
    }
  }, [discountCode, isEditing, setValue]);

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------

  return (
    <>
      {isLoading && createPortal(<LoadingBackdrop open />, document.body)}
      <form onSubmit={onSubmitMiddleware(handleSubmit)}>
        <Grid container gap={2}>
          <Grid item sm={6} xs={12}>
            <TextInput
              className="w-full"
              control={control}
              label="Código"
              name="code"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextInput
              className="w-full"
              control={control}
              label="Descuento (%)"
              name="discount"
            />
          </Grid>
        </Grid>
        <Grid container className="mt-2" gap={2}>
          <Grid item xs={isEditing ? 6 : 12}>
            <button
              className={`${koulen.className} ${!areAllFieldsFilled ? 'bg-gray-200' : 'three-d-button--red'} btn w-full text-lg`}
              disabled={!areAllFieldsFilled}
              type="submit"
            >
              {isEditing ? 'GUARDAR' : 'CARGAR'}
            </button>
          </Grid>
          {isEditing && (
            <Grid item xs={6}>
              <button
                className={`${koulen.className} ${!areAllFieldsFilled ? 'bg-gray-200' : 'three-d-button--gray'} btn w-full text-lg`}
                type="button"
                onClick={handleCancel}
              >
                CANCELAR
              </button>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};
export default DiscountCodeForm;
