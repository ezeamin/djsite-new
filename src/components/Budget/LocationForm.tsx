import ComboBoxInput from '../ui/ComboBoxInput/ComboBoxInput';

import { FormSchemas } from '@/forms';

import { LocationFormProps } from '../interface/budget';

const LocationForm = <T extends FormSchemas>(props: LocationFormProps<T>) => {
  const { control } = props;

  return (
    <ComboBoxInput
      className="w-full"
      control={control}
      label="Ubicación (exacta)"
      name="location"
      options={[]}
      placeholder="Buscá tu dirección"
    />
  );
};
export default LocationForm;
