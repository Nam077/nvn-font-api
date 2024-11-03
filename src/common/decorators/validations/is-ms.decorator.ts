import type { ValidationOptions, ValidationArguments } from 'class-validator';
import { registerDecorator } from 'class-validator';

/**
 * Custom IsMs decorator
 * This checks if the value is a valid number representing milliseconds.
 *
 * @param {ValidationOptions} validationOptions - Validation options.
 * @returns {PropertyDecorator} - Custom validation decorator.
 */
export const IsMs = (validationOptions?: ValidationOptions): PropertyDecorator => {
    return (object: NonNullable<unknown>, propertyName: string) => {
        registerDecorator({
            name: 'IsMs',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    // Kiểm tra nếu giá trị là một số nguyên dương (milliseconds)
                    return typeof value === 'number' && Number.isInteger(value) && value >= 0;
                },

                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a positive integer representing milliseconds.`;
                },
            },
        });
    };
};
