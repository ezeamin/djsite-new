'use client';

import HourPicker from '../HourPicker/HourPicker';

import InputController from '@/components/ui/InputController/InputController';
import type { InputProps } from '@/components/ui/TextInput/TextInput.types';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/forms';

const HourInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const {
    control,
    hideLabel = false,
    helperText = '',
    name,
    label,
    className = '',
    defaultValue = '',
    ...rest
  } = props;

  return (
    <fieldset className={cn('form-control ', className)}>
      <label className="text-lg" htmlFor={name as string}>
        {label}
      </label>
      <InputController
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <HourPicker
            className={!hideLabel ? 'mt-1' : undefined}
            disabled={rest.disabled}
            error={Boolean(error)}
            id={name as string}
            name={field.name}
            ref={field.ref}
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

export default HourInput;
