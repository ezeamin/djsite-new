import { ReactNode } from 'react';

import './reset.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="text-white sm:px-20 md:px-48 lg:px-64 xl:px-80">
      {children}
    </section>
  );
};

export default RootLayout;
