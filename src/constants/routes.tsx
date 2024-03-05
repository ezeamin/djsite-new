import { PATHS } from './paths';
import { FaDollarSign, FaInstagram, FaMusic, FaWhatsapp } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';

import { Route } from './interface';

export const ROUTES: Record<string, Route> = {
  BUDGET: {
    id: 1000,
    name: 'Presupuestar',
    path: PATHS.BUDGET,
    icon: <FaDollarSign size="1.10rem" />,
  },
  NEXT_EVENTS: {
    id: 1001,
    name: 'Próximos eventos',
    path: PATHS.NEXT_EVENTS,
    icon: <FaCalendarDays size="1.10rem" />,
  },
  SETS: {
    id: 1002,
    name: 'Enganchados',
    path: PATHS.SETS,
    icon: <FaMusic size="1.10rem" />,
  },
  CONTACT: {
    id: 1003,
    name: 'Contacto',
    path: PATHS.CONTACT,
    icon: <FaWhatsapp size="1.10rem" />,
  },
  INSTAGRAM: {
    id: 1004,
    name: 'Instagram',
    path: PATHS.INSTAGRAM,
    icon: <FaInstagram size="1.10rem" />,
  },
};
