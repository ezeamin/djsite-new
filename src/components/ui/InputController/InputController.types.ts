import type {
  ControllerFieldState,
  ControllerRenderProps,
  Path,
  UseFormStateReturn,
} from 'react-hook-form';

import type { FormSchemas } from '@/forms';

import { FormHandling } from '@/components/interface/ui';

export interface ControllerProps<T extends FormSchemas>
  extends FormHandling<T, false> {
  defaultValue: string | number | boolean | null;
  render: ({
    field,
    fieldState: { error },
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => React.ReactElement;
}
