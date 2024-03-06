import GMCB from '@/components/ui/GMapsComboBox/ComboBox/GMCB';
import InputController from '@/components/ui/InputController/InputController';

import { cn } from '@/utilities';

import type { FormSchemas } from '@/forms';

import type { GMapsComboBoxProps } from './GMapsComboBox.types';

const GMapsComboBox = <T extends FormSchemas>(
  props: GMapsComboBoxProps<T>
): JSX.Element => {
  const {
    className = '',
    control,
    helperText = '',
    hideLabel = false,
    inputClassName = '',
    name,
    label,
    loading = false,
    options = [],
    placeholder,
    query,
    setQuery,
    getInputProps,
    getSuggestionItemProps,
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
        defaultValue={null}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <GMCB<T>
            controller={field}
            disabled={rest.disabled}
            error={!!error}
            getInputProps={getInputProps}
            getSuggestionItemProps={getSuggestionItemProps}
            id={name as string}
            inputClassName={inputClassName}
            loading={loading}
            name={name.toString()}
            options={options}
            placeholder={placeholder ?? 'Ingrese un valor'}
            query={query}
            setQuery={setQuery}
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

export default GMapsComboBox;
