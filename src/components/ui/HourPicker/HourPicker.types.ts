import { ChangeEventHandler } from 'react';

export interface HourPickerProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  name: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
