import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { Suggestion } from 'react-places-autocomplete';

import type { ListOption } from '@/interface';

export type GMCBProps<T extends FieldValues> = {
  className?: string;
  controller: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  error?: boolean;
  inputClassName?: string;
  loading?: boolean;
  msgError?: string;
  name: string;
  options: ListOption[];
  placeholder: string;
  query: string;
  setQuery: (value: string) => void;
  getInputProps: () => Record<string, unknown>;
  getSuggestionItemProps: (props: Suggestion) => Record<string, unknown>;
};
