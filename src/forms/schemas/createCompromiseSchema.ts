import { textRules } from '../rules/rules';
import { z } from 'zod';

export const createCompromiseSchema = z.object({
  reason: textRules(true, 'Título', 3, 20),
  date: z.string().trim().min(3),
  time: z.enum(['Dia', 'Noche'], {
    errorMap: () => ({ message: 'Elegí el turno: "día" ó "noche"' }),
  }),
});

export type CreateCompromiseSchema = z.infer<typeof createCompromiseSchema>;
