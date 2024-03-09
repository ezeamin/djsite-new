import { dateAfterOrToday, dateRules } from '../rules/rules';
import { z } from 'zod';

export const budgetFormSchema = z
  .object({
    date: dateRules(true),
    time: z.enum(['Dia', 'Noche'], {
      errorMap: () => ({ message: 'Elegí el turno: "día" ó "noche"' }),
    }),
    location: z
      .string({
        invalid_type_error: 'Elegí una "ubicación" válida',
      })
      .trim()
      .min(1, 'Elegí una "ubicación" válida'),
    hours: z
      .string({
        invalid_type_error: 'Elegí una cantidad de "horas" válida',
      })
      .trim()
      .min(1, "Elegí una cantidad de 'horas' válida"),
    service: z.enum(['Basico', 'Parlantes'], {
      errorMap: () => ({
        message: 'Elegí un tipo de servicio: "Básico" ó "Sonido"',
      }),
    }),
    discountCode: z.string().trim().optional(),
  })
  .refine(dateAfterOrToday, dateAfterOrToday.msg);

export type BudgetFormSchema = z.infer<typeof budgetFormSchema>;
