import type {
  Control,
  FieldValues,
  Path,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';

import type { FormSchemas } from '@/forms';

export type FormHandling<T extends FieldValues, TisFile extends boolean> = {
  control: UseFormReturn<T>['control'];
  name: keyof T;
} & (TisFile extends true
  ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue: UseFormSetValue<any>;
    }
  : {
      setValue?: never;
    });

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- it needs to be a type for the forwardRef to work fine
export type ListOption = {
  id: number;
  description: string;
};
