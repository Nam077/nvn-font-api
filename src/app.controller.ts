import { Controller, Get } from '@nestjs/common';

import { AppService } from '@/app.service';

/**
 *
 */
@Controller()
export class AppController {
    /**
     * Creates an instance of app controller.
     * @param {AppService} appService - The app service.
     * @example `new AppController(appService);`
     */
    constructor(private readonly appService: AppService) {}

    /**
     * Get hello message.
     * @example `getHello();`
     * @returns {string} The hello message.
     */
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
