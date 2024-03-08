export interface ListOption {
  id: string;
  description: string;
}

export interface AnyProp {
  [key: string]: unknown;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  events: Event[];
}
export interface Event {
  id: string;
  title: string;
  date: Date;
  time: 'Dia' | 'Noche' | string;
  startTime: string;
  endTime: string;
  location: string;
  service: 'Basico' | 'Parlantes' | string;
  price: number;
  paid: number;
  observations: string;
  id_client: string;
  client: {
    name: string;
    phone: string;
  };
}

export interface Compromise {
  id: string;
  reason: string;
  date: Event['date'];
  time: Event['time'];
}

export type MinimalEvent = {
  id: string;
  date: Event['date'];
  time: Event['time'];
} & (
  | {
      type: 'event';
      title: string;
    }
  | {
      type: 'compromise';
      title: never;
    }
);
