'use client';

import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteDiscountCode } from '@/utilities';

import { koulen } from '@/styles/fonts';

import { DeleteDiscountCodeProps } from '@/components/interface/admin';

const DeleteDiscountCode = (props: DeleteDiscountCodeProps) => {
  const { id, code } = props;

  const handleRemove = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¡No podrás revertir esto! Código: ${code}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#395aa8',
      cancelButtonColor: '#333333',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDiscountCode(id);
          toast.success('Código eliminado');
        } catch (error) {
          console.error('ERROR DELETING DISCOUNT CODE', error);
          toast.error('Error al eliminar el código');
        }
      }
    });
  };

  return (
    <button
      className={`three-d-button--red btn w-full ${koulen.className} text-lg text-white`}
      type="button"
      onClick={handleRemove}
    >
      ELIMINAR
    </button>
  );
};
export default DeleteDiscountCode;
