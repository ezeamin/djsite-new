import type { FormSchemas } from '@/forms';

import { FormHandling } from '@/components/interface/ui';

export interface InputProps<T extends FormSchemas>
  extends FormHandling<T, false>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'required' | 'name'> {
  label: string;
  helperText?: string;
  hideLabel?: boolean;
  className?: string;
}
