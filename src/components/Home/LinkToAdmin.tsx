import Link from 'next/link';

import { PATHS } from '@/constants/paths';

const LinkToAdmin = () => {
  return (
    <Link
      className="transparent fixed right-0 top-0 h-[30px] w-[30px] cursor-none"
      href={PATHS.ADMIN.AUTH}
    />
  );
};
export default LinkToAdmin;
