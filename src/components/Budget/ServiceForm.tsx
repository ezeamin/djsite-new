import Grid from '../ui/Grid/Grid';
import RadioButtonInput from '../ui/RadioButtonInput/RadioButtonInput';

import { FormSchemas } from '@/forms';

import { ServiceFormProps } from '../interface/budget';

const ServiceForm = <T extends FormSchemas>(props: ServiceFormProps<T>) => {
  const { control, name } = props;

  return (
    <fieldset>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="text-lg" htmlFor="hours">
        Tipo de servicio
      </label>
      <Grid container className="mt-1" component="section" gap={2}>
        <Grid item xs={6}>
          <RadioButtonInput control={control} label="Basico" name={name} />
        </Grid>
        <Grid item xs={6}>
          <RadioButtonInput control={control} label="Parlantes" name={name} />
        </Grid>
      </Grid>
      <p className="mt-2 rounded bg-gray-800/25 px-3 py-2 text-sm">
        El servicio básico es solo musicalización. No incluye parlantes. Ambos
        requeriran una mesa adicional para el DJ.
      </p>
    </fieldset>
  );
};
export default ServiceForm;
