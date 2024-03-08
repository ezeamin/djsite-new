'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FaHistory } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import Swal from 'sweetalert2';

import { PATHS } from '@/constants/paths';

import { koulen } from '@/styles/fonts';

const DashboardHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar la sesión',
      showCancelButton: true,
      confirmButtonColor: '#395aa8',
      cancelButtonColor: '#333333',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      scrollbarPadding: false,
    }).then(async (action) => {
      if (action.isConfirmed) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
        router.push(PATHS.HOME);
      }
    });
  };

  return (
    <header>
      <div className="flex justify-between">
        <h1 className={`${koulen.className} text-4xl`}>Dashboard</h1>
        <div>
          <Link
            className="three-d-button--gray btn h-[40px] min-h-0 w-[40px] rounded-full p-0"
            href={PATHS.ADMIN.HISTORY}
          >
            <FaHistory size="1rem" />
          </Link>
          <button
            className="three-d-button--red btn ml-2 h-[40px] min-h-0 w-[40px] rounded-full p-0"
            type="button"
            onClick={handleLogout}
          >
            <FaArrowRightFromBracket size="1rem" />
          </button>
        </div>
      </div>
      <div className="divider mb-1 mt-0 before:bg-gray-400/25 after:bg-gray-400/25" />
    </header>
  );
};
export default DashboardHeader;
