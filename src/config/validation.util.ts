import type { ClassConstructor } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { forEach, map, values } from 'lodash';

import {
    AppConfig,
    DatabaseConfig,
    EmailConfig,
    JwtConfig,
    RabbitMQConfig,
    RedisConfig,
    SecretConfig,
} from '@config/validations';

/**
 *
 */
class ConfigValidationError extends Error {
    /**
     * Represents an error that occurs during configuration validation.
     *
     * @param {string} message - The error message.
     * @example \`new ConfigValidationError('Validation failed for AppConfig configuration')`
     */
    public constructor(message: string) {
        super(message);
        this.name = 'ConfigValidationError';
    }
}

/**
 * Validates the configuration object against the provided classes.
 *
 * @template T - The type of the configuration object.
 * @param {Record<string, unknown>} config - The configuration object to validate.
 * @param {ClassConstructor<T>[]} envVariablesClasses - The classes to validate the configuration object against.
 * @returns {void}
 */
export const validateConfig = (config: Record<string, unknown>, envVariablesClasses: ClassConstructor<any>[]): void => {
    forEach(envVariablesClasses, (envVariablesClass) => {
        const validatedConfig = plainToClass(envVariablesClass, config, {
            enableImplicitConversion: true,
        });

        const errors = validateSync(validatedConfig, {
            skipMissingProperties: false,
        });

        if (errors.length > 0) {
            const errorMsg = map(
                errors,
                (error) =>
                    `\nProperty: ${error.property}\n` +
                    map(values(error.constraints ?? {}), (msg) => `+ ${msg}`).join('\n'),
            ).join('\n');

            const fullErrorMsg = `Validation failed for ${envVariablesClass.name} configuration:\n${errorMsg}`;

            throw new ConfigValidationError(fullErrorMsg);
        }
    });
};

/**
 * Validates the configuration object and returns it if it is valid.
 *
 * @template T - The type of the configuration object.
 * @param {Record<string, unknown>} config - The configuration object to validate.
 * @returns {Record<string, unknown>} The validated configuration object.
 */
export const validateAndReturnConfig = (config: Record<string, unknown>): Record<string, unknown> => {
    validateConfig(config, [
        AppConfig,
        DatabaseConfig,
        RedisConfig,
        RabbitMQConfig,
        JwtConfig,
        EmailConfig,
        SecretConfig,
    ]);

    return config;
};
