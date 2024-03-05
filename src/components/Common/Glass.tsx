import { ReactNode } from 'react';

const Glass = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-glass m-4 rounded-xl p-3 text-white">
      {/* <div className="glass-ball" /> */}
      {children}
    </main>
  );
};
export default Glass;
