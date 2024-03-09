import { hourRules, textRules } from '../rules/rules';
import { z } from 'zod';

export const createEventSchema = z.object({
  title: textRules(true, 'Título', 3, 20),
  date: z.string().trim().min(3),
  time: z.enum(['Dia', 'Noche'], {
    errorMap: () => ({ message: 'Elegí el turno: "día" ó "noche"' }),
  }),
  startTime: hourRules(true),
  endTime: hourRules(true),
  location: textRules(true, 'Dirección del evento', 3, 500),
  service: z.enum(['Basico', 'Parlantes'], {
    errorMap: () => ({
      message: 'Elegí un tipo de servicio: "Básico" ó "Sonido"',
    }),
  }),
  price: z.coerce
    .number({
      invalid_type_error: 'El precio debe ser un número',
    })
    .positive({
      message: 'El precio debe ser un número positivo',
    }),
  paid: z.coerce
    .number({
      invalid_type_error: 'El precio pagado debe ser un número',
    })
    .positive({
      message: 'El precio pagado debe ser un número positivo',
    }),
  observations: z.string().trim(),
  clientName: textRules(true, 'Nombre del cliente', 3, 45),
  clientPhone: textRules(true, 'Teléfono del cliente', 8, 15),
});

export type CreateEventSchema = z.infer<typeof createEventSchema>;
