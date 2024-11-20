import { useEffect, useState } from 'react';

import DateInput from '../ui/DateInput/DateInput';
import TimeForm from './TimeForm';
import { Control } from 'react-hook-form';
import { toast } from 'sonner';

import { FormSchemas } from '@/forms';

import { DateAndTimeFormProps } from '../interface/budget';

const DateAndTimeForm = <T extends FormSchemas>(
  props: DateAndTimeFormProps<T>
) => {
  const { control, watch, busyDates } = props;

  const [isBusy, setIsBusy] = useState(false);

  const date = watch('date');
  const time = watch('time');

  // Busy day detection
  useEffect(() => {
    if (date && time && busyDates && busyDates.length > 0) {
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

  // Friday detection -- disabled for now
  // useEffect(() => {
  //   const day = new Date(date).getDay();
  //   if (day === 5) {
  //     toast.info(
  //       'Atención: Los viernes son de disponibilidad limitada gracias a mi querida facultad! 💀',
  //       {
  //         duration: 5000,
  //       }
  //     );
  //   }
  // }, [date]);

  // More than two months detection
  useEffect(() => {
    const today = new Date();
    const selectedDate = new Date(date);
    const diffTime = Math.abs(selectedDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 60) {
      toast.info(
        'Atención: La fecha supera el mes de anticipación! El precio puede no ser el indicado',
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
      <DateInput<T>
        hideLabel
        control={control as unknown as Control<T>}
        label="Fecha"
        name={'date' as keyof T}
        placeholder="dd/mm/aaaa"
      />
      <TimeForm<T>
        control={control as unknown as Control<T>}
        name={'time' as keyof T}
      />
    </>
  );
};
export default DateAndTimeForm;
