import type { ValidationOptions } from 'class-validator';
import { ValidateIf } from 'class-validator';
/**
 * The IsNullable decorator.
 *
 * @param {ValidationOptions} options - Validation options.
 * @returns {PropertyDecorator} - Decorator to validate if the value is nullable.
 */
export const IsNullable = (options?: ValidationOptions): PropertyDecorator =>
    ValidateIf((_obj, value) => value !== null, options);
