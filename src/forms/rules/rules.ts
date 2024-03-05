import dayjs from 'dayjs';
import { z } from 'zod';

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

type RuleType<T extends z.ZodType, U extends boolean> = U extends true
  ? T
  : z.ZodOptional<T>;

export function optionalWrapper<T extends z.ZodType, U extends boolean>(
  required: U,
  rule: T
): RuleType<T, U> {
  if (required) return rule as RuleType<T, U>;
  return z.optional(rule) as RuleType<T, U>;
}

// ----------------------------------------------------
// COMMON RULES
// ----------------------------------------------------

export const resolutionRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .max(25, {
      message: 'El Número de acordada debe tener como máximo 25 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length >= 3;
        }

        return true;
      },
      {
        message: 'El Número de acordada debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const dateRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .union([z.date(), z.string()])
    // Check if it's a string (empty field)
    .refine(
      (data) => {
        return typeof data === 'string' || data instanceof Date;
      },
      {
        message: `Debe ingresar una fecha valida`,
      }
    )
    .refine(
      // If it has a value, it must be a valid date
      (data) => {
        if (required && !data) return false;
        if (!data) return true;
        const date = dayjs(data);
        return date.isValid();
      },
      {
        message: `La fecha no es válida`,
      }
    );

  return optionalWrapper(required, rule);
};

export const hourRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string({
      invalid_type_error: 'Debe ingresar una hora válida',
    })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'La hora debe tener el formato HH:MM',
    })
    .default('');

  return optionalWrapper(required, rule);
};

export const typeRules = <T extends boolean = false>(
  required: T,
  typeName = ''
) => {
  const rule = z.object(
    {
      id: z.string().trim().min(1),
      description: z.string().trim().min(1),
    },
    {
      invalid_type_error: `Debe ingresar un ${typeName} válido`,
    }
  );

  return optionalWrapper(required, rule);
};

export const multipleValuesRules = <T extends boolean = false>(required: T) => {
  // each value is of type {id: string, description: string}, that's an interface called ListOption
  const rule = z
    .array(
      z.object({
        id: z.string().trim().min(1),
        description: z.string().trim().min(1),
      })
    )
    .default([]);

  return optionalWrapper(required, rule);
};

export const cuilRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .trim()
    .regex(/^\d+$/, {
      message: 'El CUIL debe contener solo números',
    })
    .max(11, {
      message: 'El CUIL debe tener como máximo 11 caracteres',
    })
    .refine(
      // Min length is 11 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length >= 11;
        }

        return true;
      },
      {
        message: 'El CUIL debe tener 11 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const lastnameRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .trim()
    .max(50, {
      message: 'El Apellido debe tener como máximo 50 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length >= 3;
        }

        return true;
      },
      {
        message: 'El Apellido debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const nameRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .trim()
    .max(50, {
      message: 'El Nombre debe tener como máximo 50 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length >= 3;
        }

        return true;
      },
      {
        message: 'El Nombre debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const textRules = <T extends boolean = false>(
  required: T,
  fieldName = 'Texto'
) => {
  const rule = z
    .string()
    .trim()
    .max(1000, {
      message: `El ${fieldName} debe tener como máximo 1000 caracteres`,
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length >= 3;
        }

        return true;
      },
      {
        message: `El ${fieldName} debe tener al menos 3 caracteres`,
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

// TODO: Check if usernames will be strings or CUIL
export const usernameRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .max(50, {
      message: 'El Usuario debe tener como máximo 50 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length >= 3;
        }

        return true;
      },
      {
        message: 'El Usuario debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const booleanRules = <T extends boolean = false>(required: T) => {
  const rule = z.boolean().default(false);

  return optionalWrapper(required, rule);
};

export const emailRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .trim()
    .email({
      message: 'Debe ingresar un Email válido',
    })
    .max(100, {
      message: 'El Email debe tener como máximo 100 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length >= 3;
        }

        return true;
      },
      {
        message: 'El Email debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const dniRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .trim()
    .regex(/^\d+$/, {
      message: 'El DNI debe contener solo números',
    })
    .max(8, {
      message: 'El DNI debe tener 7 u 8 caracteres',
    })
    .refine(
      // Min length is 7 when it does have content (cannot use .min() because it's initially empty and optional)
      (data) => {
        if (required) {
          return data.length >= 7;
        }

        return true;
      },
      {
        message: 'El DNI debe tener 7 u 8 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

// TODO: Define password rules
export const passwordRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .trim()
    .max(25, {
      message: 'La contraseña debe tener como máximo 25 caracteres',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
      message:
        'La contraseña debe tener al menos una mayúscula, una minúscula y un número',
    })
    .refine(
      // Min length is 6 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length >= 6;
        }

        return true;
      },
      {
        message: 'La contraseña debe tener al menos 6 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const phoneRules = <T extends boolean = false>(required: T) => {
  const rule = z.coerce
    .number({
      invalid_type_error: `Debe ingresar un Número de Teléfono válido`,
    })
    .int({
      message: 'Debe ingresar un número entero en Número de Teléfono',
    })
    .positive({
      message: 'Debe ingresar un número positivo en Número de Teléfono',
    })
    .max(9999999999999, {
      message: 'El número de teléfono debe tener como mucho 13 dígitos',
    })
    .default(0);

  return optionalWrapper(required, rule);
};

// ----------------------------------------------------
// COMMON REFINES
// ----------------------------------------------------

// At least one field must have value
export const notEmptyForm = (data: object) => {
  return Object.values(data).some(Boolean);
};

notEmptyForm.msg = () => ({
  message: 'Por lo menos un campo debe tener valores',
});

// If fromDate and toDate have values, fromDate must be before or equal to toDate
export const fromDateBeforeToDate = (data: {
  fromDate: Date | string | null;
  toDate: Date | string | null;
}) => {
  if (!data.fromDate || !data.toDate) return true;
  const fromDate = dayjs(data.fromDate);
  const toDate = dayjs(data.toDate);
  return fromDate.isBefore(toDate) || fromDate.isSame(toDate, 'day');
};

fromDateBeforeToDate.msg = () => ({
  message: 'La fecha desde debe ser menor a la fecha hasta',
});

// If fromDate has value, toDate must have value too
export const fromDateAndToDate = (
  data: {
    fromDate: Date | string | null;
    toDate: Date | string | null;
  },
  field: 'toDate' | 'fromDate'
) => {
  const otherField = field === 'toDate' ? 'fromDate' : 'toDate';

  if (!data[field]) return true;
  return data[field] && !!data[otherField];
};

fromDateAndToDate.msg = (field: 'toDate' | 'fromDate') => ({
  message: `Para buscar por fecha ${
    field === 'toDate' ? 'hasta' : 'desde'
  }, debe ingresar también una fecha ${field === 'toDate' ? 'desde' : 'hasta'}`,
  path: [field],
});

export const fromHourBeforeToHour = (data: {
  startHour: string;
  endHour: string;
}) => {
  if (!data.startHour || !data.endHour) return true;
  if (data.startHour === data.endHour) return true;
  return data.startHour < data.endHour;
};

fromHourBeforeToHour.msg = () => ({
  message: 'La hora de inicio debe ser menor a la hora de fin',
});

export const dateBeforeOrToday = (data: {
  date: Date | string | undefined;
}) => {
  if (!data.date) return true;
  const date = dayjs(data.date);
  return date.isBefore(dayjs()) || date.isSame(dayjs(), 'day');
};

dateBeforeOrToday.msg = () => ({
  message: 'La fecha debe ser anterior o igual a la fecha actual',
});

export const fromDateAfterOrToday = (data: {
  fromDate: Date | string | undefined;
}) => {
  if (!data.fromDate) return true;
  const fromDate = dayjs(data.fromDate);
  return fromDate.isAfter(dayjs()) || fromDate.isSame(dayjs(), 'day');
};

fromDateAfterOrToday.msg = () => ({
  message: 'La fecha desde debe ser futura o igual a la fecha actual',
});

export const dateAfterOrToday = (data: { date: Date | string | undefined }) => {
  if (!data.date) return true;
  const date = dayjs(data.date);
  return date.isAfter(dayjs()) || date.isSame(dayjs(), 'day');
};

dateAfterOrToday.msg = () => ({
  message: 'La fecha debe ser futura o igual a la fecha de hoy',
});
