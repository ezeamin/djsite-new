'use client';

import InputController from '@/components/ui/InputController/InputController';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/forms';

import type { InputProps } from './TextInput.types';

const TextInput = <T extends FormSchemas>(
  props: InputProps<T>
): React.ReactElement => {
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
          <input
            className={`input input-bordered ${
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
            onBlur={field.onBlur}
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

export default TextInput;
