'use client';

import { useState } from 'react';

import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import LoadingBackdrop from '@/components/Loading/LoadingBackdrop';

import { changeMessage } from '@/utilities';

import { koulen } from '@/styles/fonts';

import { ChangeMessageProps } from '@/components/interface/admin';

const ChangeMessage = (props: ChangeMessageProps) => {
  const { message } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    Swal.fire({
      title: 'Mensaje',
      input: 'text',
      inputLabel: 'Cargar mensaje nuevo',
      inputPlaceholder: 'Escribí tu mensaje',
      showCancelButton: true,
      confirmButtonColor: '#395aa8',
      cancelButtonColor: '#333333',
      confirmButtonText: 'Cargar 🤙🏻',
      cancelButtonText: 'Cancelar',
      inputValue: message,
    }).then(async (action) => {
      if (action.isConfirmed) {
        setIsLoading(true);
        try {
          await changeMessage(action.value);
          toast.success('Mensaje cargado correctamente');
        } catch (error) {
          toast.error('Error al cargar el mensaje');
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  return (
    <>
      {isLoading && createPortal(<LoadingBackdrop open />, document.body)}
      <button
        className={`three-d-button--gray btn w-full ${koulen.className} text-lg`}
        type="button"
        onClick={handleClick}
      >
        MENSAJE
      </button>
    </>
  );
};
export default ChangeMessage;
