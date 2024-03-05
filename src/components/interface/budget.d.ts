import { Control } from 'react-hook-form';

import { FormSchemas } from '@/forms';

export interface TimeFormProps<T extends FormSchemas> {
  control: Control<T>;
}

export interface LocationFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {}

export interface HoursFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {}

export interface ServiceFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {}
