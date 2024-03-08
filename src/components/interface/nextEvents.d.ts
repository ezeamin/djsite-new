import { MinimalEvent } from '@/interface';

export interface NextEventsListProps {
  events: MinimalEvent[];
}

export interface NextEventItemProps {
  event: MinimalEvent;
}

export interface NextCompromiseItemProps {
  compromise: MinimalEvent;
}
