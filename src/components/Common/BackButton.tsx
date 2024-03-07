import Link from 'next/link';

import { IoChevronBack } from 'react-icons/io5';

import { PATHS } from '@/constants/paths';

const BackButton = () => {
  return (
    <Link
      className="three-d-button fixed bottom-3 left-3 z-[9999999] flex h-[50px] w-[50px] items-center justify-center rounded-full text-gray-700"
      href={PATHS.HOME}
    >
      <IoChevronBack />
    </Link>
  );
};
export default BackButton;
