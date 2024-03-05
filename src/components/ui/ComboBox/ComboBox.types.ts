import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import type { ListOption } from '@/interface';

export type ComboBoxProps<T extends FieldValues> = {
  className?: string;
  controller: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  error?: boolean;
  inputClassName?: string;
  msgError?: string;
  name: string;
  options: ListOption[];
  placeholder: string;
};
