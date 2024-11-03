import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { OffsetPaginationDto } from '@/common/dtos';

/**
 * The offset paginated DTO.
 *
 * @template T - The type of the data.
 */
export class OffsetPaginatedDto<T> {
    @ApiProperty({ type: [Object] })
    @Expose()
    public readonly data: T[];

    @ApiProperty()
    @Expose()
    public pagination: OffsetPaginationDto;

    /**
     * Creates an instance of paginated DTO.
     *
     * @param {T[]} data - The data.
     * @param {OffsetPaginationDto} meta - The pagination metadata.
     * @example  new OffsetPaginatedDto<User>([user], new OffsetPaginationDto(1, 1, 1));
     */
    public constructor(data: T[], meta: OffsetPaginationDto) {
        this.data = data;
        this.pagination = meta;
    }
}
