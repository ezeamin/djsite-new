'use client';

import { ForwardedRef, forwardRef } from 'react';

import { cn } from '@/utilities';

import { HourPickerProps } from './HourPicker.types';

/**
 * Component for selecting hours.
 * @param props - The props for the HourPicker component.
 * @param [props.className = ''] - Additional CSS class for the component.
 * @param [props.dti] - data-testid attribute value.
 * @param [props.error] - Indicates whether the input has an error.
 * @param [props.name] - Name of the input.
 * @param props.onChange - Function to execute when the selected date changes.
 * @param [props.placeholder] - Placeholder text for the input.
 * @returns The HourPicker component.
 */

const HourPicker = forwardRef(
  (
    props: HourPickerProps,
    inputRef: ForwardedRef<HTMLInputElement>
  ): React.ReactElement => {
    const {
      className = '',
      error = false,
      name,
      disabled = false,
      placeholder,
      ...rest
    } = props;

    return (
      <input
        className={cn(
          `input input-bordered w-full bg-gray-100 dark:bg-slate-700 ${
            error && 'border-error'
          }`,
          className
        )}
        disabled={disabled}
        name={name}
        placeholder={placeholder || 'Seleccione la Hora'}
        ref={inputRef}
        type="time"
        {...rest}
      />
    );
  }
);

HourPicker.displayName = 'HourPicker';

export default HourPicker;
