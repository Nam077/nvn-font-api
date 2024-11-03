import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PageOptionsCursorDto } from '@/common';
import { DEFAULT_PAGE_LIMIT } from '@/shared';

/**
 *
 */
export class CursorPaginationDto {
    @ApiProperty()
    @Expose()
    public readonly limit: number;

    @ApiProperty()
    @Expose()
    public readonly afterCursor?: string;

    @ApiProperty()
    @Expose()
    public readonly beforeCursor?: string;

    @ApiProperty()
    @Expose()
    public readonly totalRecords: number;

    /**
     * Creates an instance of cursor pagination dto.
     *
     * @param {number} totalRecords - The total number of records.
     * @param {string} afterCursor - The cursor for the next page.
     * @param {string} beforeCursor - The cursor for the previous page.
     * @param {PageOptionsCursorDto} pageOptions - The page options.
     * @example
     */
    public constructor(
        totalRecords: number,
        afterCursor: string,
        beforeCursor: string,
        pageOptions: PageOptionsCursorDto,
    ) {
        this.limit = pageOptions.limit ?? DEFAULT_PAGE_LIMIT;
        this.afterCursor = afterCursor;
        this.beforeCursor = beforeCursor;
        this.totalRecords = totalRecords;
    }
}
