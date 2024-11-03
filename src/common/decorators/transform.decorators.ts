import { Transform } from 'class-transformer';
import type { TransformFnParams } from 'class-transformer';
import { isArray, map, trim, replace, upperCase, toLower } from 'lodash';

/**
 * Trim and replace multiple spaces with single space.
 *
 * @param {string | string[]} value - Value to be trimmed and spaces replaced.
 * @returns {string | string[]} - Trimmed and spaces replaced value.
 */
const trimAndReplaceSpaces = (value: string | string[]): string | string[] => {
    if (isArray(value)) {
        return map(value, (item) => (typeof item === 'string' ? trim(replace(item, /\s{2,}/g, ' ')) : item));
    }

    return trim(replace(value, /\s{2,}/g, ' '));
};

/**
 * Trim decorator.
 *
 * @returns {PropertyDecorator} - Transform decorator.
 */
export const Trim = (): PropertyDecorator =>
    Transform((params: TransformFnParams) => {
        const value = params.value as string | string[];

        return trimAndReplaceSpaces(value);
    });

/**
 * Convert string or string array to uppercase.
 *
 * @param {string | string[]} value - Value to be converted to uppercase.
 * @returns {string | string[]} - Converted value.
 */
const toUpperCase = (value: string | string[]): string | string[] => {
    if (isArray(value)) {
        return map(value, (item) => (typeof item === 'string' ? upperCase(item) : item));
    }

    return typeof value === 'string' ? upperCase(value) : value;
};

/**
 * Uppercase decorator.
 *
 * @returns {PropertyDecorator} - Transform decorator.
 */
export const Uppercase = (): PropertyDecorator =>
    Transform((params: TransformFnParams) => {
        const value = params.value as string | string[];

        return toUpperCase(value);
    });

/**
 * Convert string or string array to lowercase.
 *
 * @param {string | string[]} value - Value to be converted to lowercase.
 * @returns {string | string[]} - Converted value.
 */
const toLowerCase = (value: string | string[]): string | string[] => {
    if (isArray(value)) {
        return map(value, (item) => (typeof item === 'string' ? toLower(item) : item));
    }

    return typeof value === 'string' ? toLower(value) : value;
};

/**
 * Lowercase decorator.
 *
 * @returns {PropertyDecorator} - Transform decorator.
 */
export const Lowercase = (): PropertyDecorator =>
    Transform((params: TransformFnParams) => {
        const value = params.value as string | string[];

        return toLowerCase(value);
    });

/**
 * Capitalize the first letter of a string or each string in array.
 *
 * @param {string | string[]} value - Value to be capitalized.
 * @returns {string | string[]} - Capitalized value.
 */
const capitalize = (value: string | string[]): string | string[] => {
    if (isArray(value)) {
        return map(value, (item) => (typeof item === 'string' ? upperCase(item.charAt(0)) + item.slice(1) : item));
    }

    return typeof value === 'string' ? upperCase(value.charAt(0)) + value.slice(1) : value;
};

/**
 * Capitalize decorator.
 *
 * @returns {PropertyDecorator} - Transform decorator.
 */
export const Capitalize = (): PropertyDecorator =>
    Transform((params: TransformFnParams) => {
        const value = params.value as string | string[];

        return capitalize(value);
    });

/**
 * Remove all spaces from a string or array of strings.
 *
 * @param {string | string[]} value - Value to have spaces removed.
 * @returns {string | string[]} - Value without spaces.
 */
const removeSpaces = (value: string | string[]): string | string[] => {
    if (isArray(value)) {
        return map(value, (item) => (typeof item === 'string' ? replace(item, /\s+/g, '') : item));
    }

    return typeof value === 'string' ? replace(value, /\s+/g, '') : value;
};

/**
 * RemoveSpaces decorator.
 *
 * @returns {PropertyDecorator} - Transform decorator.
 */
export const RemoveSpaces = (): PropertyDecorator =>
    Transform((params: TransformFnParams) => {
        const value = params.value as string | string[];

        return removeSpaces(value);
    });

/**
 * Convert string or number to boolean.
 *
 * @param {string | number} value - Value to be converted to boolean.
 * @returns {boolean} - Converted boolean value.
 */
const toBoolean = (value: string | number): boolean => {
    if (typeof value === 'string') {
        const normalizedValue = toLower(trim(value));

        return normalizedValue === 'true' || normalizedValue === '1';
    }

    if (typeof value === 'number') {
        return value === 1;
    }

    return Boolean(value);
};

/**
 * ToBoolean decorator.
 *
 * @returns {PropertyDecorator} - Transform decorator to convert values to boolean.
 */
export const ToBoolean = (): PropertyDecorator =>
    Transform((params: TransformFnParams) => {
        const value = params.value;

        return toBoolean(value);
    });
