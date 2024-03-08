import { z } from 'zod';

export const discountCodesSchema = z.object({
  code: z
    .string()
    .trim()
    .min(5, {
      message: 'El código debe tener al menos 5 caracteres',
    })
    .max(20, {
      message: 'El código debe tener como máximo 20 caracteres',
    }),
  discount: z.coerce
    .number()
    .min(0, {
      message: 'El descuento debe ser mayor o igual a 0',
    })
    .max(100, {
      message: 'El descuento debe ser menor o igual a 100',
    }),
});

export type DiscountCodesSchema = z.infer<typeof discountCodesSchema>;
