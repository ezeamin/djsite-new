import InputController from '../InputController/InputController';

import { cn } from '@/utilities';

import { FormSchemas } from '@/forms';

import { koulen } from '@/styles/fonts';

import { InputProps } from '../TextInput/TextInput.types';

const RadioButtonInput = <T extends FormSchemas>(
  props: InputProps<T>
): React.ReactElement => {
  const { className = '', control, name, label, defaultValue = '' } = props;

  return (
    <InputController
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({
        field: { onBlur, onChange, ref, value },
        fieldState: { error },
      }) => (
        <div className="w-full">
          <input hidden id={label} ref={ref} type="radio" value={label} />
          <button
            className={cn(
              `${koulen.className} three-d-button btn w-full text-xl text-gray-800 ${value === label ? 'three-d-button--red' : ''} ${error ? 'border-error' : ''} `,
              className
            )}
            type="button"
            value={label}
            onBlur={onBlur}
            onClick={onChange}
          >
            {label.toUpperCase()}
          </button>
        </div>
      )}
    />
  );
};
export default RadioButtonInput;
