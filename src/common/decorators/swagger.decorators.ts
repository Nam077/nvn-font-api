import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { CursorPaginatedDto, OffsetPaginationDto, PaginationEnum } from '@/common';

interface IApiPaginatedResponseOptions<T> {
    type: T;
    description?: string;
    paginationType?: PaginationEnum;
}

/**
 * The API paginated response decorator.
 *
 * @param {IApiPaginatedResponseOptions} options - The API paginated response options.
 * @returns {MethodDecorator} The method decorator.
 */
export const ApiPaginatedResponse = <T extends Type<any>>(
    options: IApiPaginatedResponseOptions<T>,
): MethodDecorator => {
    return applyDecorators(
        ApiExtraModels(
            options.paginationType === PaginationEnum.OFFSET ? OffsetPaginationDto : CursorPaginatedDto,
            options.type,
        ),
        ApiOkResponse({
            description: options.description ?? `Paginated list of ${options.type.name}`,
            schema: {
                title: `PaginatedResponseOf${options.type.name}`,
                allOf: [
                    {
                        $ref: getSchemaPath(
                            options.paginationType === PaginationEnum.OFFSET ? OffsetPaginationDto : CursorPaginatedDto,
                        ),
                    },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(options.type) },
                            },
                        },
                    },
                ],
            },
        } as ApiResponseOptions | undefined),
    );
};
