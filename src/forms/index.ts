import { AuthFormSchema } from './schemas/authFormSchema';
import { BudgetFormSchema } from './schemas/budgetFormSchema';
import { CreateCompromiseSchema } from './schemas/createCompromiseSchema';
import { CreateEventSchema } from './schemas/createEventSchema';
import { DiscountCodesSchema } from './schemas/discountCodesSchema';

/**
 * This folder should include all validations schemas across the project.
 * Each validation schema should be a zod object.
 * Each validation schema should be also exported as a type at the bottom of the file.
 * For handling TS support, it's necessary that, when adding a new validation schema, its type is joined at FormSchemas with the other types.
 */

/**
 * Type that joins all validation schemas.
 */

// Use | to join all validation schemas types.
export type FormSchemas =
  | BudgetFormSchema
  | AuthFormSchema
  | DiscountCodesSchema
  | CreateEventSchema
  | CreateCompromiseSchema;
