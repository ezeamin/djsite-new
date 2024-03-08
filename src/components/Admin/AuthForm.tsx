'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import LoadingBackdrop from '../Loading/LoadingBackdrop';
import TextInput from '../ui/TextInput/TextInput';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';

import { useZodForm } from '@/hooks';

import { AuthFormSchema, authFormSchema } from '@/forms/schemas/authFormSchema';

import { koulen } from '@/styles/fonts';

const AuthForm = () => {
  const { onSubmitMiddleware, control, areAllFieldsFilled } =
    useZodForm(authFormSchema);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: AuthFormSchema) => {
    setIsLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    const data = await res.json();

    setIsLoading(false);

    if (!res.ok) {
      toast.warning(data.message || 'Ocurrió un error');
    }

    if (res.status === 200) {
      toast.success('Bienvenido! 😎');
      window.setTimeout(() => {
        router.push('/admin/events');
      }, 1000);
    }
  };

  return (
    <>
      {isLoading && createPortal(<LoadingBackdrop open />, document.body)}
      <form onSubmit={onSubmitMiddleware(handleSubmit)}>
        <TextInput
          className="w-full"
          control={control}
          label="Clave"
          name="password"
          type="password"
        />
        <button
          className={`${areAllFieldsFilled ? 'three-d-button--red' : 'bg-gray-300'} btn mt-2 w-full text-lg ${koulen.className}`}
          disabled={!areAllFieldsFilled}
          type="submit"
        >
          INGRESAR
        </button>
      </form>
      <p className="mt-16">¿No sos Eze? Salí de aca! 😠</p>
    </>
  );
};
export default AuthForm;
