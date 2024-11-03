import { STATUS_CODES } from 'http';

import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import type { Type } from '@nestjs/common';
import {
    ApiResponse,
    ApiOperation,
    ApiOkResponse,
    ApiBasicAuth,
    ApiSecurity,
    ApiBearerAuth,
    ApiCreatedResponse,
} from '@nestjs/swagger';
import { compact, get, intersection, map, values } from 'lodash';

import { ApiPaginatedResponse } from '@/common';
import { ErrorDto } from '@/common/dtos/error.dto';

type AuthDecoratorType = ClassDecorator | MethodDecorator | PropertyDecorator;
type ApiResponseType = number;
export enum APIAuthEnum {
    BASIC = 'basic',
    API_KEY = 'api-key',
    JWT = 'jwt',
}

export enum PaginationEnum {
    OFFSET = 'offset',
    CURSOR = 'cursor',
}

interface IApiOptions<T extends Type<any>> {
    type?: T;
    summary?: string;
    description?: string;
    errorResponses?: ApiResponseType[];
    statusCode?: HttpStatus;
    isPaginated?: boolean;
    paginationType?: PaginationEnum;
}

type ApiPublicOptionsType = Partial<IApiOptions<Type<any>>>;
type ApiAuthOptionsType = Partial<IApiOptions<Type<any>>> & { auths?: APIAuthEnum[] };

const defaultErrorResponses: ApiResponseType[] = [
    HttpStatus.BAD_REQUEST,
    HttpStatus.FORBIDDEN,
    HttpStatus.NOT_FOUND,
    HttpStatus.UNPROCESSABLE_ENTITY,
    HttpStatus.INTERNAL_SERVER_ERROR,
];

/**
 * Create a common API decorator.
 *
 * @param {IApiOptions} options - The API options.
 * @param {boolean} isAuth - The flag to indicate if the API is authenticated.
 * @param {APIAuthEnum[]} auths - The list of authentication types.
 * @returns {MethodDecorator} - The method decorator.
 */
const createApiDecorator = (
    options: IApiOptions<Type<any>>,
    isAuth: boolean = false,
    auths: APIAuthEnum[] = [],
): MethodDecorator => {
    const {
        type = ErrorDto,
        summary,
        description = 'OK',
        statusCode = HttpStatus.OK,
        isPaginated = false,
        paginationType = PaginationEnum.OFFSET,
        errorResponses = defaultErrorResponses,
    } = options;

    const okResponse = {
        type,
        description,
        paginationType,
    };

    const errorDecorators = map(errorResponses, (statusCode) =>
        ApiResponse({
            status: statusCode,
            type: ErrorDto,
            description: get(STATUS_CODES, statusCode.toString(), 'Error'),
        }),
    );

    const authDecorators: AuthDecoratorType[] = isAuth
        ? compact(
              map(intersection(auths, values(APIAuthEnum)), (auth) => {
                  switch (auth) {
                      case APIAuthEnum.BASIC:
                          return ApiBasicAuth();
                      case APIAuthEnum.API_KEY:
                          return ApiSecurity('Api-Key');
                      case APIAuthEnum.JWT:
                          return ApiBearerAuth();
                      default:
                          return undefined;
                  }
              }),
          )
        : [];

    return applyDecorators(
        ApiOperation({ summary }),
        HttpCode(statusCode),
        isPaginated
            ? ApiPaginatedResponse(okResponse)
            : statusCode === HttpStatus.CREATED
              ? ApiCreatedResponse(okResponse)
              : ApiOkResponse(okResponse),
        ...authDecorators,
        ...errorDecorators,
    );
};

/**
 * Public API decorator.
 *
 * @param {ApiPublicOptionsType} options - The API options.
 * @returns {MethodDecorator} - The method decorator.
 */
export const ApiPublic = (options: ApiPublicOptionsType = {}): MethodDecorator => {
    return createApiDecorator(options, false);
};

/**
 * Authenticated API decorator.
 *
 * @param {ApiAuthOptionsType} options - The API auth options.
 * @returns {MethodDecorator} - The method decorator.
 */
export const ApiAuth = (options: ApiAuthOptionsType = {}): MethodDecorator => {
    return createApiDecorator(options, true, options.auths ?? [APIAuthEnum.JWT]);
};
