import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { FaHome } from 'react-icons/fa';

import BackButton from '@/components/Common/BackButton';

import { PATHS } from '@/constants/paths';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="mb-3 mt-5 flex items-center justify-between">
        <Image
          priority
          alt="logo dj eze amin"
          height={50}
          src="/img/icon.ico"
          width={50}
        />
        <Link className="three-d-button btn text-xl" href={PATHS.HOME}>
          <FaHome />
        </Link>
      </header>
      <section>{children}</section>
      <BackButton />
    </>
  );
};
export default layout;
