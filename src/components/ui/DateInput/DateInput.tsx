'use client';

import DatePicker from '@/components/ui/DatePicker/DatePicker';
import InputController from '@/components/ui/InputController/InputController';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/forms';

import type { InputProps } from './DateInput.types';

// TODO: Improve typing for this component!!

const DateInput = <T extends FormSchemas>(
  props: InputProps<T>
): JSX.Element => {
  const {
    control,
    helperText = '',
    hideLabel = false,
    name,
    label,
    className = '',
    ...rest
  } = props;

  return (
    <fieldset className={cn('form-control ', className)}>
      {!hideLabel && (
        <label className="text-lg" htmlFor={name as string}>
          {label}
        </label>
      )}
      <InputController
        control={control}
        defaultValue=""
        // ^ This doesn't work here because DateTimePicker works differently than other inputs
        name={name}
        render={({
          field: { onChange, name: inputName, value },
          fieldState: { error },
        }) => (
          <DatePicker
            className={!hideLabel ? 'mt-1' : undefined}
            disabled={rest.disabled}
            error={Boolean(error)}
            name={inputName}
            // TODO: Check this! Throws error when building project
            // @ts-expect-error - value type is broken
            value={value}
            // TODO: Check this! Throws error when building project
            // @ts-expect-error - onChange takes the value in the DateTimePicker component, but not here. Works this way
            onChange={onChange}
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
export default DateInput;
