import Grid from '../ui/Grid/Grid';
import RadioButtonInput from '../ui/RadioButtonInput/RadioButtonInput';

import { FormSchemas } from '@/forms';

import { TimeFormProps } from '../interface/budget';

const TimeForm = <T extends FormSchemas>(props: TimeFormProps<T>) => {
  const { control, name } = props;

  return (
    <Grid container component="fieldset" gap={2}>
      <Grid item xs={6}>
        <RadioButtonInput control={control} label="Dia" name={name} />
      </Grid>
      <Grid item xs={6}>
        <RadioButtonInput control={control} label="Noche" name={name} />
      </Grid>
    </Grid>
  );
};
export default TimeForm;
