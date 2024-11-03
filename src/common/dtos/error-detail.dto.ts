import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 *
 */
export class ErrorDetailDto {
    @ApiPropertyOptional({})
    public property?: string;

    @ApiPropertyOptional({})
    public messages?: string[];

    @ApiPropertyOptional({})
    public message?: string;
}
