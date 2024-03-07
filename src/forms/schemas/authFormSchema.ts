import { z } from 'zod';

export const authFormSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Elegí una "clave" válida',
    })
    .min(1, 'Elegí una "clave" válida'),
});

export type AuthFormSchema = z.infer<typeof authFormSchema>;
