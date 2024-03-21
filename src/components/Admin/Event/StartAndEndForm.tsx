import Grid from '@/components/ui/Grid/Grid';
import HourInput from '@/components/ui/HourInput/HourInput';

import { FormSchemas } from '@/forms';

import { StartAndEndFormProps } from '@/components/interface/admin';

const StartAndEndForm = <T extends FormSchemas>(
  props: StartAndEndFormProps<T>
) => {
  const { control, name } = props;

  return (
    <Grid container gap={2}>
      <Grid item xs={6}>
        <HourInput
          control={control}
          label="Hora inicio"
          name={'startTime' as keyof T}
        />
      </Grid>
      <Grid item xs={6}>
        <HourInput
          control={control}
          label="Hora fin"
          name={'endTime' as keyof T}
        />
      </Grid>
    </Grid>
  );
};
export default StartAndEndForm;
