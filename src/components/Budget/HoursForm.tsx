import RadioButtonInput from '../ui/RadioButtonInput/RadioButtonInput';

import { FormSchemas } from '@/forms';

import { HoursFormProps } from '../interface/budget';

const HoursForm = <T extends FormSchemas>(props: HoursFormProps<T>) => {
  const { control, name } = props;

  return (
    <fieldset>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="text-lg" htmlFor="hours">
        Tiempo (horas)
      </label>
      <section className="mt-1 flex justify-between gap-1 sm:gap-2">
        <RadioButtonInput control={control} label="Menos" name={name} />
        <RadioButtonInput control={control} label="4" name={name} />
        <RadioButtonInput control={control} label="5" name={name} />
        <RadioButtonInput control={control} label="6" name={name} />
        <RadioButtonInput control={control} label="Mas" name={name} />
      </section>
    </fieldset>
  );
};
export default HoursForm;
