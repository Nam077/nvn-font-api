import { Controller, Get, Query } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { AppService } from '@/app.service';
import { ApiPublic, CursorPaginatedDto } from '@/common';

/**
 *
 */
class UserData {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public name: string;
}
/**
 *
 */
@Controller()
export class AppController {
    /**
     * Creates an instance of app controller.
     *
     * @param {AppService} appService - The app service.
     * @example \`new AppController(appService);`
     */
    constructor(private readonly appService: AppService) {}

    /**
     * Get hello message.
     *
     * @example \`getHello();`
     * @returns {string} The hello message.
     */
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    /**
     * Create user.
     *
     * @param {UserData} cursorPaginatedDto - The cursor paginated dto.
     * @example \`create(cursorPaginatedDto);`
     * @returns {void} The void.
     */
    @Get()
    @ApiPublic({
        type: CursorPaginatedDto<UserData>,
    })
    create(@Query() cursorPaginatedDto: UserData): void {
        console.log(cursorPaginatedDto);
    }
}
