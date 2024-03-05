import Link from 'next/link';

import { GoArrowUpRight } from 'react-icons/go';

import { OptionProps } from '../interface/home';

const Option = (props: OptionProps) => {
  const { option } = props;

  if (option.path.includes('http')) {
    return (
      <Link
        className="three-d-button btn w-full justify-between"
        href={option.path}
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <span className="flex gap-1 font-bold">
          {option.name}
          <GoArrowUpRight className="mt-[0.1rem]" />
        </span>
        <span>{option.icon}</span>
      </Link>
    );
  }

  return (
    <Link
      className="three-d-button btn w-full justify-between"
      href={option.path}
    >
      <span className="font-bold">{option.name}</span>
      <span>{option.icon}</span>
    </Link>
  );
};
export default Option;
