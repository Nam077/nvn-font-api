import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { CursorPaginationDto } from '@/common';

/**
 * The paginated dto.
 *
 * @template TData - The type of the data.
 */
export class CursorPaginatedDto<TData> {
    @ApiProperty({ type: () => [Object] }) // Sử dụng lazy resolver
    @Expose()
    public readonly data: TData[];

    @ApiProperty({ type: () => CursorPaginationDto }) // Sử dụng lazy resolver
    @Expose()
    public pagination: CursorPaginationDto;

    /**
     * Creates an instance of paginated dto.
     *
     * @param {TData[]} data - The data.
     * @param {CursorPaginationDto} meta - The pagination metadata.
     * @example
     */
    public constructor(data: TData[], meta: CursorPaginationDto) {
        this.data = data;
        this.pagination = meta;
    }
}
