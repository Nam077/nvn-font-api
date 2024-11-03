import { NumberFieldOptional, StringFieldOptional } from '@/common/decorators';
import { DEFAULT_PAGE_LIMIT } from '@/shared';

/**
 *
 */
export class PageOptionsCursorDto {
    @StringFieldOptional()
    public afterCursor?: string;

    @StringFieldOptional()
    public beforeCursor?: string;

    @NumberFieldOptional({
        minimum: 1,
        default: DEFAULT_PAGE_LIMIT,
        int: true,
    })
    public readonly limit?: number = DEFAULT_PAGE_LIMIT;

    @StringFieldOptional()
    public readonly q?: string;
}
