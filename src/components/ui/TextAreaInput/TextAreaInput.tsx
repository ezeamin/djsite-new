'use client';

import InputController from '@/components/ui/InputController/InputController';
import type { InputProps } from '@/components/ui/TextInput/TextInput.types';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/forms';

const TextAreaInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    helperText = '',
    hideLabel = false,
    name,
    label,
    type = 'text',
    defaultValue = '',
    ...rest
  } = props;

  return (
    <fieldset className={cn('form-control w-72', className)}>
      {!hideLabel && (
        <label className="text-lg" htmlFor={name as string}>
          {label}
        </label>
      )}
      <InputController
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <textarea
            className={`textarea textarea-bordered ${
              !hideLabel ? 'mt-1' : ''
            } w-full bg-gray-100 dark:bg-slate-700 ${
              error ? 'border-error' : ''
            }`}
            disabled={rest.disabled}
            id={name as string}
            placeholder={rest.placeholder ?? 'Ingrese un valor'}
            ref={field.ref}
            type={type}
            value={field.value as string}
            // @ts-expect-error -- Somehow TS detects these functions are for an input, but that isn't defined!
            onBlur={field.onBlur}
            // @ts-expect-error -- Somehow TS detects these functions are for an input, but that isn't defined!
            onChange={field.onChange}
            {...rest}
          />
        )}
      />
      {!!helperText && (
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </fieldset>
  );
};

export default TextAreaInput;
