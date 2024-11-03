import { EnumFieldOptional, NumberFieldOptional, StringFieldOptional } from '@/common/decorators';
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_LIMIT, OrderEnum } from '@/shared';

/**
 *
 */
export class PageOptionsPOffsetDto {
    @NumberFieldOptional({
        minimum: 1,
        default: DEFAULT_PAGE_LIMIT,
        int: true,
    })
    public readonly limit?: number;

    @NumberFieldOptional({
        minimum: 1,
        default: DEFAULT_CURRENT_PAGE,
        int: true,
    })
    public readonly page?: number;

    @StringFieldOptional()
    public readonly q?: string;

    @EnumFieldOptional(() => OrderEnum, { default: OrderEnum.ASC })
    public readonly order?: OrderEnum = OrderEnum.ASC;

    /**
     * The offset for the current page.
     *
     * @returns {number} The offset.
     * @example
     */
    private get offset(): number {
        const page = this.page ?? DEFAULT_CURRENT_PAGE;
        const limit = this.limit ?? DEFAULT_PAGE_LIMIT;

        return (page - 1) * limit;
    }
}
