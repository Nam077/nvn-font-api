import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ErrorDetailDto } from '@/common';

/**
 *
 */
export class ErrorDto {
    @ApiProperty({
        description: 'Timestamp when the error occurred',
        example: '2024-10-23T10:15:30Z',
    })
    public timestamp: string;

    @ApiProperty({
        description: 'HTTP status code',
        example: 400,
    })
    public statusCode: number;

    @ApiProperty({
        description: 'Error type or name',
        example: 'Bad Request',
    })
    public error: string;

    @ApiPropertyOptional({
        description: 'Optional error code for further classification',
        example: 'ERR_001',
    })
    public errorCode?: string;

    @ApiProperty({
        description: 'A human-readable error message',
        example: 'Invalid input data.',
    })
    public message: string;

    @ApiPropertyOptional({
        type: ErrorDetailDto,
        isArray: true,
        description: 'Array of detailed error information, if applicable',
    })
    public details?: ErrorDetailDto[];

    @ApiPropertyOptional({
        description: 'The API endpoint where the error occurred',
        example: '/api/v1/users',
    })
    public path?: string;

    @ApiPropertyOptional({
        description: 'The HTTP method used in the request',
        example: 'POST',
    })
    public method?: string;

    @ApiHideProperty()
    public stack?: string;

    @ApiHideProperty()
    public trace?: Error | unknown;
}
