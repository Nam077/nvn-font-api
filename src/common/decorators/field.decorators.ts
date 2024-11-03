import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import type { ApiPropertyOptions } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import type { ValidationArguments, IsNumberOptions } from 'class-validator';
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsEnum,
    IsNumber,
    IsInt,
    IsPositive,
    Min,
    Max,
    MinLength,
    MaxLength,
    IsBoolean,
    IsEmail,
    IsJWT,
    IsUUID,
    IsUrl,
    ValidateNested,
    IsDate,
} from 'class-validator';
import { isArray } from 'lodash';
import type * as ValidatorJS from 'validator';

import { Lowercase, Uppercase, ToBoolean } from '@/common/decorators/transform.decorators';
import { IsNullable } from '@/common/decorators/validations';
import type { Constructor } from '@/shared';

export type ValidationMessageType = string | ((args: ValidationArguments) => string);

export interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
}

export interface IValidatorOptionBase {
    isNotEmpty?: ValidationMessageType;
}

export interface IValidatorOptionNumber extends IValidatorOptionBase {
    isInt?: string;
    isNumber?: {
        options?: IsNumberOptions;
        message?: ValidationMessageType;
    };
    min?: ValidationMessageType;
    max?: ValidationMessageType;
    isPositive?: ValidationMessageType;
}

export interface IValidatorOptionString extends IValidatorOptionBase {
    isString?: ValidationMessageType;
    minLength?: ValidationMessageType;
    maxLength?: ValidationMessageType;
}

export interface INumberFieldOptions extends IFieldOptions {
    min?: number;
    max?: number;
    int?: boolean;
    isPositive?: boolean;
    validationOptions?: IValidatorOptionNumber;
}

export interface IStringFieldOptions extends IFieldOptions {
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
    validationOptions?: IValidatorOptionString;
}

export interface IBooleanFieldOptions extends IFieldOptions {
    validationOptions?: IValidatorOptionBase;
}

export interface ITokenFieldOptions extends IFieldOptions {
    validationOptions?: IValidatorOptionBase & { isJWT?: ValidationMessageType };
}

export interface IEmailFieldOptions extends IFieldOptions {
    validationOptions?: IValidatorOptionBase & {
        isEmail?: {
            options?: ValidatorJS.IsEmailOptions;
            message?: ValidationMessageType;
        };
    };
}

export interface IEnumFieldOptions extends IFieldOptions {
    enumName?: string;
    validationOptions?: IValidatorOptionBase & { isEnum?: ValidationMessageType };
}

export interface IClassFieldOptions extends IFieldOptions {
    validationOptions?: IValidatorOptionBase & {
        isDefined?: ValidationMessageType;
        validateNested?: ValidationMessageType;
    };
}

export interface IUUIDFieldOptions extends IFieldOptions {
    validationOptions?: IValidatorOptionBase & {
        isUUID?: {
            version?: ValidatorJS.UUIDVersion;
            validationOptions?: ValidationMessageType;
        };
    };
}

export interface IUrlFieldOptions extends IFieldOptions {
    validationOptions?: IValidatorOptionBase & {
        isUrl?: {
            options?: ValidatorJS.IsURLOptions;
            validationOptions?: ValidationMessageType;
        };
    };
}

export interface IDateFieldOptions extends IFieldOptions {
    validationOptions?: IValidatorOptionBase & {
        isDate?: ValidationMessageType;
    };
}

// Extract variable name utility
const getVariableName = (variableFunction: () => any): string => {
    const funcString = variableFunction.toString();
    const variableName = funcString.match(/return (\w+)/)?.[1];

    return variableName || 'Unknown';
};

// Apply common decorators
const applyCommonDecorators = (
    options: IFieldOptions & Partial<ApiPropertyOptions>,
    type: () => Constructor,
): PropertyDecorator[] => {
    const decorators: PropertyDecorator[] = [Type(type)];

    if (options.nullable) {
        decorators.push(IsNullable({ each: options.each }));
    } else {
        decorators.push(IsNotEmpty({ each: options.each }));
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: type(), isArray: !!options.each, ...options } as ApiPropertyOptions));
    }

    if (options.each) {
        decorators.push(Transform(({ value }) => (isArray(value) ? value : [value])));
    }

    return decorators;
};

// Optional decorator helper
const makeOptionalDecorator =
    (fieldDecorator: (options: any) => PropertyDecorator) =>
    (options: any = {}): PropertyDecorator =>
        applyDecorators(IsOptional({ each: options.each }), fieldDecorator({ ...options, required: false }));

// Number Field Decorators
const NumberField = (options: Omit<ApiPropertyOptions, 'type'> & INumberFieldOptions = {}): PropertyDecorator => {
    const decorators = applyCommonDecorators(options, () => Number);

    if (options.int) {
        decorators.push(IsInt({ each: options.each, message: options.validationOptions?.isInt }));
    } else {
        decorators.push(IsNumber(options.validationOptions?.isNumber?.options, { each: options.each }));
    }

    if (options.min !== undefined) decorators.push(Min(options.min, { each: options.each }));
    if (options.max !== undefined) decorators.push(Max(options.max, { each: options.each }));
    if (options.isPositive) decorators.push(IsPositive({ each: options.each }));

    return applyDecorators(...decorators);
};

const NumberFieldOptional = makeOptionalDecorator(NumberField);

// String Field Decorators
const StringField = (options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {}): PropertyDecorator => {
    const decorators = applyCommonDecorators(options, () => String);

    decorators.push(IsString({ each: options.each }), IsNotEmpty({ each: options.each }));
    if (options.toLowerCase) decorators.push(Lowercase());
    if (options.toUpperCase) decorators.push(Uppercase());
    if (options.minLength !== undefined) decorators.push(MinLength(options.minLength, { each: options.each }));
    if (options.maxLength !== undefined) decorators.push(MaxLength(options.maxLength, { each: options.each }));

    return applyDecorators(...decorators);
};

const StringFieldOptional = makeOptionalDecorator(StringField);

// Boolean Field Decorators
export const BooleanField = (
    options: Omit<ApiPropertyOptions, 'type'> & IBooleanFieldOptions = {},
): PropertyDecorator => {
    const decorators = applyCommonDecorators(options, () => Boolean);

    decorators.push(ToBoolean(), IsBoolean({ each: options.each, ...options.validationOptions }));

    return applyDecorators(...decorators);
};

const BooleanFieldOptional = makeOptionalDecorator(BooleanField);

// Email Field Decorators
const EmailField = (options: Omit<ApiPropertyOptions, 'type'> & IEmailFieldOptions = {}): PropertyDecorator => {
    const decorators = applyCommonDecorators(options, () => String);

    decorators.push(
        IsNotEmpty({ each: options.each, message: options.validationOptions?.isNotEmpty }),
        IsEmail(options.validationOptions?.isEmail?.options, {
            each: options.each,
            message: options.validationOptions?.isEmail?.message,
        }),
    );

    return applyDecorators(...decorators);
};

const EmailFieldOptional = makeOptionalDecorator(EmailField);

// Token Field Decorators
const TokenField = (options: Omit<ApiPropertyOptions, 'type'> & ITokenFieldOptions = {}): PropertyDecorator => {
    const decorators = applyCommonDecorators(options, () => String);

    decorators.push(IsJWT({ each: options.each }));

    return applyDecorators(...decorators);
};

const TokenFieldOptional = makeOptionalDecorator(TokenField);

// Enum Field Decorators
// Enum Field Decorators
const EnumField = <T extends object>(
    getEnum: () => T,
    options: Omit<ApiPropertyOptions, 'type' | 'enum' | 'isArray'> & IEnumFieldOptions = {},
): PropertyDecorator => {
    const enumType = getEnum();
    const enumName = options.enumName || getVariableName(getEnum);

    const decorators = applyCommonDecorators(
        {
            ...options,
            enum: enumType,
            type: 'string',
            enumName,
            required: options.required as boolean,
        },
        () => String,
    );

    // Add validation decorator for the enum
    decorators.push(IsEnum(enumType, { each: options.each, message: options.validationOptions?.isEnum }));

    return applyDecorators(...decorators);
};

const EnumFieldOptional = <TEnum extends object>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, 'type' | 'enum' | 'isArray'> & IEnumFieldOptions = {},
): PropertyDecorator => {
    return applyDecorators(IsOptional({ each: options.each }), EnumField(getEnum, { ...options, required: false }));
};

// UUID Field Decorators
const UUIDField = (options: Omit<ApiPropertyOptions, 'type'> & IUUIDFieldOptions = {}): PropertyDecorator => {
    const decorators = applyCommonDecorators(options, () => String);

    decorators.push(IsUUID(options.validationOptions?.isUUID?.version, { each: options.each }));

    return applyDecorators(...decorators);
};

const UUIDFieldOptional = makeOptionalDecorator(UUIDField);

// URL Field Decorators
const UrlField = (options: Omit<ApiPropertyOptions, 'type'> & IUrlFieldOptions = {}): PropertyDecorator => {
    const decorators = applyCommonDecorators(options, () => String);

    decorators.push(IsUrl(options.validationOptions?.isUrl?.options, { each: options.each }));

    return applyDecorators(...decorators);
};

const UrlFieldOptional = makeOptionalDecorator(UrlField);

// Date Field Decorators
const DateField = (options: Omit<ApiPropertyOptions, 'type'> & IDateFieldOptions = {}): PropertyDecorator => {
    const decorators = applyCommonDecorators(options, () => Date);

    decorators.push(IsDate({ each: options.each }));

    return applyDecorators(...decorators);
};

const DateFieldOptional = makeOptionalDecorator(DateField);

// Class Field Decorators
const ClassField = <T extends Constructor>(
    getClass: () => T,
    options: Omit<ApiPropertyOptions, 'type'> & IClassFieldOptions = {},
): PropertyDecorator => {
    const decorators: PropertyDecorator[] = [
        Type(() => getClass()),
        ValidateNested({ each: options.each, message: options.validationOptions?.validateNested }),
    ];

    decorators.push(IsNotEmpty({ each: options.each }));

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({ type: () => getClass(), isArray: !!options.each, ...options } as ApiPropertyOptions),
        );
    }

    if (options.each) {
        decorators.push(Transform(({ value }) => (isArray(value) ? value : [value])));
    }

    return applyDecorators(...decorators);
};

const ClassFieldOptional = makeOptionalDecorator(ClassField);

export {
    NumberField,
    NumberFieldOptional,
    StringField,
    StringFieldOptional,
    BooleanFieldOptional,
    EmailField,
    EmailFieldOptional,
    TokenField,
    TokenFieldOptional,
    EnumField,
    EnumFieldOptional,
    UUIDField,
    UUIDFieldOptional,
    UrlField,
    UrlFieldOptional,
    DateField,
    DateFieldOptional,
    ClassField,
    ClassFieldOptional,
};
