import Image from 'next/image';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="mb-3 mt-5">
        <Image
          priority
          alt="logo dj eze amin"
          height={50}
          src="/img/icon.ico"
          width={50}
        />
      </header>
      <section>{children}</section>
    </>
  );
};
export default Layout;
