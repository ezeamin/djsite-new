import { cn } from '@/utilities';

import { EventElementProps } from '../interface/admin';

const EventElement = (props: EventElementProps) => {
  const { label, value, className = '', bold = false } = props;

  return (
    <div className={cn('mb-0 flex justify-between gap-2', className)}>
      <p>{label}:</p>
      <p className={`text-end ${bold ? 'font-bold' : ''}`}>{value || 'N/A'}</p>
    </div>
  );
};
export default EventElement;
