import Option from './Option';

import { ROUTES } from '@/constants/routes';

const options = Object.values(ROUTES);

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
