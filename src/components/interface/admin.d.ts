import { FormHandling } from './ui';

import { FormSchemas } from '@/forms';
import { CreateEventSchema } from '@/forms/schemas/createEventSchema';

import { Compromise, DiscountCode, Event } from '@/interface';

export interface ChangeMessageProps {
  message: string;
}

export interface EventDescriptionProps {
  event: Event;
}

export interface CompromiseDescriptionProps {
  compromise: Compromise;
}

export interface EventElementProps {
  label: string;
  value: string;
  className?: string;
  bold?: boolean;
}

export interface DeleteCompromiseButtonProps {
  id: Compromise['id'];
  reason: Compromise['reason'];
}

export interface DiscountCodeItemProps {
  discountCode: DiscountCode;
}

export interface DiscountCodeFormProps {
  discountCode: DiscountCode | null;
}

export interface DeleteDiscountCodeProps {
  id: DiscountCode['id'];
  code: DiscountCode['code'];
}

export interface CreateEventFormProps {
  eventToModify?: CreateEventSchema;
}

export interface StartAndEndFormProps<T extends FormSchemas>
  extends FormHandling<T, false> {}
