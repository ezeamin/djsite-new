import Option from './Option';

import { HOME_OPTIONS } from '@/constants/homeOptions';

const options = Object.values(HOME_OPTIONS);

const Menu = () => {
  return (
    <section className="flex flex-col gap-3">
      {options.map((option) => (
        <Option key={option.id} option={option} />
      ))}
    </section>
  );
};
export default Menu;
