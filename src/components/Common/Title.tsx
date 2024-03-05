import { koulen } from '@/styles/fonts';

import { TitleProps } from '../interface/common';

const Title = (props: TitleProps) => {
  const { title, subtitle } = props;

  return (
    <>
      <h1 className={`${koulen.className} text-4xl text-white`}>{title}</h1>
      {!!subtitle && <h2 className="text-gray-300">{subtitle}</h2>}
      <div className="divider mb-1 mt-0 before:bg-gray-400/25 after:bg-gray-400/25" />
    </>
  );
};
export default Title;
