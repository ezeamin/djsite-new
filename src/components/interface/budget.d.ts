import { FormHandling } from './ui';
import {
  Control,
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { TypeOf, z } from 'zod';

import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';
import { CreateEventSchema } from '@/forms/schemas/createEventSchema';

export interface BudgetFormProps {
  busyDates: { time: string; date: Date }[];
}

export interface DateAndTimeFormProps<T extends FieldValues>
  extends Omit<FormHandling<BudgetFormSchema, false>, 'name'> {
  busyDates?: { time: string; date: Date }[];
  watch: UseFormWatch<BudgetFormSchema>;
}

export interface TimeFormProps<T extends FieldValues>
  extends FormHandling<T, false> {}

export interface LocationFormProps<T extends FieldValues>
  extends TimeFormProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  hideHelp?: boolean;
}

export interface HoursFormProps<T extends FieldValues>
  extends TimeFormProps<T> {}

export interface ServiceFormProps<T extends FieldValues>
  extends TimeFormProps<T> {
  hideHelp?: boolean;
}
