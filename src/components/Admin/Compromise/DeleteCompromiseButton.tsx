'use client';

import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteCompromise } from '@/utilities';

import { koulen } from '@/styles/fonts';

import { DeleteCompromiseButtonProps } from '@/components/interface/admin';

const DeleteCompromiseButton = (props: DeleteCompromiseButtonProps) => {
  const { id, reason } = props;

  const handleRemove = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¡No podrás revertir esto! Compromiso: ${reason}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#395aa8',
      cancelButtonColor: '#333333',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCompromise(id);
        toast.success('Compromiso eliminado');
      }
    });
  };

  return (
    <button
      className={`three-d-button--red btn w-full items-center ${koulen.className} text-lg text-white`}
      type="button"
      onClick={handleRemove}
    >
      ELIMINAR
    </button>
  );
};
export default DeleteCompromiseButton;
