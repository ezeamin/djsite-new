import { FormHandling } from './ui';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TypeOf, z } from 'zod';

import { FormSchemas } from '@/forms';
import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';
import { CreateEventSchema } from '@/forms/schemas/createEventSchema';

export interface BudgetFormProps {
  busyDates: { time: string; date: Date }[];
}

export interface DateAndTimeFormProps<T extends FormSchemas>
  extends Omit<FormHandling<BudgetFormSchema, false>, 'name'> {
  busyDates?: { time: string; date: Date }[];
  watch: UseFormWatch<BudgetFormSchema>;
}

export interface TimeFormProps<T extends FormSchemas>
  extends FormHandling<T, false> {}

export interface LocationFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  hideHelp?: boolean;
}

export interface HoursFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {}

export interface ServiceFormProps<T extends FormSchemas>
  extends TimeFormProps<T> {
  hideHelp?: boolean;
}
