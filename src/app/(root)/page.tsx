import Image from 'next/image';

import Title from '@/components/Common/Title';
import Menu from '@/components/Home/Menu';

const HomePage = () => {
  return (
    <>
      <Image
        priority
        alt="logo dj eze amin"
        className="mb-3 mt-5"
        height={75}
        src="/img/logo.webp"
        width={150}
      />
      <Title subtitle="Cachengue y Electro Pop" title="Dj Eze Amin" />
      <Menu />
    </>
  );
};
export default HomePage;
