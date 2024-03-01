import { PATHS } from './paths';
import {
  FaAward,
  FaChalkboardTeacher,
  FaClipboardList,
  FaFileContract,
  FaHome,
  FaQuestionCircle,
} from 'react-icons/fa';

import { Route } from './interface';

export const ROUTES: Record<string, Route> = {
  HOME: {
    id: 1000,
    name: 'Inicio',
    path: PATHS.HOME,
    icon: <FaHome />,
  },
  TUTORIALS: {
    id: 2000,
    name: 'Tutoriales',
    path: PATHS.TUTORIALS,
    icon: <FaChalkboardTeacher />,
  },
  INSTRUCTIVES: {
    id: 3000,
    name: 'Instructivos',
    path: PATHS.INSTRUCTIVES,
    icon: <FaClipboardList />,
  },
  NORMATIVES: {
    id: 4000,
    name: 'Normativas',
    path: PATHS.NORMATIVES,
    icon: <FaAward />,
  },
  FORMS: {
    id: 5000,
    name: 'Formularios',
    path: PATHS.FORMS,
    icon: <FaFileContract />,
  },
  FAQ: {
    id: 6000,
    name: 'Preguntas Frecuentes',
    path: PATHS.FAQ,
    icon: <FaQuestionCircle />,
  },
};
