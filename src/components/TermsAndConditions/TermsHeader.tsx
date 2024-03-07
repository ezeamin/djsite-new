import Image from 'next/image';

import Title from '../Common/Title';

import { koulen } from '@/styles/fonts';

const TermsHeader = () => {
  return (
    <header>
      <Image
        priority
        alt="logo dj eze amin"
        className="mb-3 mt-5"
        height={95}
        src="/img/logo.webp"
        width={200}
      />
      <Title title="Terminos y condiciones" />
      <p className="mb-2 rounded bg-gray-200/25 px-3 py-2 text-sm">
        La contratación del servicio implica la aceptación de los términos que
        continuan.
      </p>
    </header>
  );
};
export default TermsHeader;
