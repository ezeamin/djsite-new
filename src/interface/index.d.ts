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
  time: string;
  startTime: string;
  endTime: string;
  location: string;
  price: number;
  paid: number;
  observations: string;
  finished: boolean;
  id_client: string;
}
