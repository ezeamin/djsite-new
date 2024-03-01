import {
  dateRules, // fromDateAndToDate,
  // fromDateBeforeToDate,
  notEmptyForm,
  resolutionRules,
  typeRules,
} from '../rules/rules';
import { z } from 'zod';

// EVERY validation for this form should be included in this schema.
// For documentation on how to validate, check https://zod.dev

// Common rules can be found in src\forms\rules\rules.ts
// It's encouraged to create new rules there and use them here, for reusability

// DATE IS IN PROGRESS

export const exampleSchema = z
  .object({
    resolution: resolutionRules(true),
    // fromDate: dateRules('desde'),
    // toDate: dateRules('hasta'),
    type: typeRules(true),
    date: dateRules(true),
  })
  .refine(notEmptyForm, notEmptyForm.msg)
  // .refine(fromDateBeforeToDate, fromDateBeforeToDate.msg)
  // .refine(
  //   (data) => fromDateAndToDate(data, 'fromDate'),
  //   () => fromDateAndToDate.msg('fromDate')
  // )
  // .refine(
  //   (data) => fromDateAndToDate(data, 'toDate'),
  //   () => fromDateAndToDate.msg('toDate')
  // )
  .refine(
    (data) => {
      // If type is selected, then at least one more field should be filled
      if (!data.type) return true;

      return Object.values(data).filter(Boolean).length > 1;
    },
    {
      message: 'Si selecciona un tipo, debe ingresar al menos un campo más',
    }
  );

// IMPORTANT - Export type and add it in index.ts FormSchemas
export type ExampleSchema = z.infer<typeof exampleSchema>;
