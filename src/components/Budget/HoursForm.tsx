import RadioButtonInput from '../ui/RadioButtonInput/RadioButtonInput';

import { FormSchemas } from '@/forms';

import { HoursFormProps } from '../interface/budget';

const HoursForm = <T extends FormSchemas>(props: HoursFormProps<T>) => {
  const { control } = props;

  return (
    <fieldset>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="text-lg" htmlFor="hours">
        Tiempo (horas)
      </label>
      <section className="mt-1 flex justify-between gap-2">
        <RadioButtonInput control={control} label="Menos" name="hours" />
        <RadioButtonInput control={control} label="4" name="hours" />
        <RadioButtonInput control={control} label="5" name="hours" />
        <RadioButtonInput control={control} label="6" name="hours" />
        <RadioButtonInput control={control} label="Mas" name="hours" />
      </section>
    </fieldset>
  );
};
export default HoursForm;
