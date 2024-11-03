import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PageOptionsPOffsetDto } from '@/common';
import { DEFAULT_PAGE_LIMIT } from '@/shared';

/**
 *
 */
export class OffsetPaginationDto {
    @ApiProperty()
    @Expose()
    public readonly limit: number;

    @ApiProperty()
    @Expose()
    public readonly currentPage: number;

    @ApiProperty()
    @Expose()
    public readonly nextPage?: number;

    @ApiProperty()
    @Expose()
    public readonly previousPage?: number;

    @ApiProperty()
    @Expose()
    public readonly totalRecords: number;

    @ApiProperty()
    @Expose()
    public readonly totalPages: number;

    /**
     * The offset pagination DTO.
     *
     * @param {number} totalRecords - The total number of records.
     * @param {PageOptionsPOffsetDto} pageOptions - The page options.
     * @example                                      \`new OffsetPaginationDto(100, { limit: 10, page: 1 })`
     */
    constructor(totalRecords: number, pageOptions: PageOptionsPOffsetDto) {
        this.limit = pageOptions.limit ?? DEFAULT_PAGE_LIMIT;
        this.currentPage = pageOptions.page ?? 1;
        this.nextPage = this.currentPage < this.totalPages ? this.currentPage + 1 : undefined;
        this.previousPage =
            this.currentPage > 1 && this.currentPage - 1 < this.totalPages ? this.currentPage - 1 : undefined;
        this.totalRecords = totalRecords;
        this.totalPages = this.limit > 0 ? Math.ceil(totalRecords / this.limit) : 1;
    }
}
