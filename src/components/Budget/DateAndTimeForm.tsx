import { useEffect, useState } from 'react';

import DateInput from '../ui/DateInput/DateInput';
import TimeForm from './TimeForm';
import { toast } from 'sonner';

import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';

import { DateAndTimeFormProps } from '../interface/budget';

const DateAndTimeForm = <T extends BudgetFormSchema>(
  props: DateAndTimeFormProps<T>
) => {
  const { control, watch, busyDates } = props;

  const [isBusy, setIsBusy] = useState(false);

  const date = watch('date');
  const time = watch('time');

  // Busy day detection
  useEffect(() => {
    if (date && time) {
      const busyTime = busyDates.find(
        (busyDate) =>
          busyDate.date.toDateString() === new Date(date).toDateString() &&
          busyDate.time === time
      );

      if (busyTime) {
        setIsBusy(true);
      } else {
        setIsBusy(false);
      }
    }
  }, [date, time, busyDates]);

  // Friday detection
  useEffect(() => {
    const day = new Date(date).getDay();
    if (day === 5) {
      toast.info(
        'Atención: Los viernes son de disponibilidad limitada gracias a mi querida facultad! 💀',
        {
          duration: 5000,
        }
      );
    }
  }, [date]);

  return (
    <>
      <div className="flex items-center justify-between">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="text-lg" htmlFor="date">
          Fecha
        </label>
        {isBusy && <div className="badge badge-warning">Fecha ocupada 😶‍🌫️</div>}
      </div>
      <DateInput<BudgetFormSchema>
        hideLabel
        control={control}
        label="Fecha"
        name="date"
        placeholder="dd/mm/aaaa"
      />
      <TimeForm<BudgetFormSchema> control={control} name="time" />
    </>
  );
};
export default DateAndTimeForm;
