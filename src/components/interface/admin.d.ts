import { Compromise, Event } from '@/interface';

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
