import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeOf, z } from 'zod';

import { FormSchemas } from '@/forms';

export interface TimeFormProps<T extends FormSchemas> {
  control: Control<T>;
}

export interface LocationFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  name: keyof T;
}

export interface HoursFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {}

export interface ServiceFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {}
