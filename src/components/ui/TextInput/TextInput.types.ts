import type { FormSchemas } from '@/forms';

import type { FormHandling } from '@/components/interface/ui';

export interface InputProps<T extends FormSchemas>
  extends FormHandling<T, false>,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'required' | 'name' | 'defaultValue'
    > {
  label: string;
  helperText?: string;
  className?: string;
  hideLabel?: boolean;
  defaultValue?: string | number | boolean | null;
}
