import { registerDecorator, type ValidationOptions } from 'class-validator';

/**
 * Validate if the value is a valid password.
 *
 * @param {ValidationOptions} validationOptions - Validation options.
 * @returns {PropertyDecorator} - Decorator to validate if the value is a valid password.
 * @example
 */
export const IsPassword = (validationOptions?: ValidationOptions): PropertyDecorator => {
    return (object, propertyName) => {
        registerDecorator({
            propertyName: propertyName as string,
            name: 'isPassword',
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: string): boolean {
                    return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
                },
                /**
                 * Default message to be shown if validation fails.
                 *
                 * @returns {string} - Default message.
                 */
                defaultMessage(): string {
                    return `$property is invalid`;
                },
            },
        });
    };
};
