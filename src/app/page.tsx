import Image from 'next/image';

import Menu from '@/components/Home/Menu';

import { koulen } from '@/styles/fonts';

const HomePage = () => {
  return (
    <>
      <Image
        priority
        alt="logo dj eze amin"
        className="mb-3 mt-5"
        height={75}
        src="../assets/logo.webp"
        width={150}
      />
      <h1 className={`${koulen.className} text-4xl text-white`}>Dj Eze Amin</h1>
      <h2 className="text-gray-300">Cachengue y Electro Pop</h2>
      <div className="divider mb-1 mt-0 before:bg-gray-400/25 after:bg-gray-400/25" />
      <Menu />
    </>
  );
};
export default HomePage;
