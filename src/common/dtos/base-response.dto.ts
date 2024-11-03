import { Exclude, Expose } from 'class-transformer';

import {} from '@/common';
import { BooleanField, ClassField, StringField } from '@/common/decorators';
/**
 * Base response DTO with generic data.
 */
@Exclude()
export class BaseResponseDto {
    @BooleanField()
    @Expose()
    public success: boolean;

    @StringField()
    @Expose()
    public message: string;

    @ClassField(() => Date)
    @Expose()
    public timestamp: Date;

    /**
     * Constructor to instantiate the class.
     *
     * @param {boolean} success - The success flag.
     * @param {string} message - The message.
     * @example                   new BaseResponseDto(true, 'Success')
     */
    public constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message;
        this.timestamp = new Date();
    }
}
