import { Suggestion } from 'react-places-autocomplete';

import type { FormSchemas } from '@/forms';

import type { FormHandling } from '@/components/interface/ui';
import type { ListOption } from '@/interface';

export interface GMapsComboBoxProps<T extends FormSchemas>
  extends FormHandling<T, false>,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'required' | 'name'> {
  label: string;
  loading?: boolean;
  className?: string;
  helperText?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  options: ListOption[];
  placeholder?: string;
  query: string;
  setQuery: (value: string) => void;
  getInputProps: () => Record<string, unknown>;
  getSuggestionItemProps: (props: Suggestion) => Record<string, unknown>;
}
