import { Compromise, Event } from '@/interface';

export interface EventDescriptionProps {
  event: Event | Compromise;
}

export interface EventElementProps {
  label: string;
  value: string;
  className?: string;
  bold?: boolean;
}
