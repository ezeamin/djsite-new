import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import type { z, ZodSchema } from 'zod';

export interface Sizes {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface UseZodForm<T extends ZodSchema> {
  onSubmitMiddleware: UseFormHandleSubmit<z.TypeOf<T>>;
  control: Control<z.TypeOf<T>>;
  reset: UseFormReset<z.TypeOf<T>>;
  areAllFieldsFilled: boolean;
  errors: FieldErrors<z.TypeOf<T>>;
  watch: UseFormWatch<z.TypeOf<T>>;
  setValue: UseFormSetValue<z.TypeOf<T>>;
}
