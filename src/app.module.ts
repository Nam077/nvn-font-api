import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { validateAndReturnConfig } from '@/config/validation.util';
import { I18nModuleLocal } from '@/modules/i18n/i18n.module';

/**
 *
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            ignoreEnvFile: process.env.NODE_ENV === 'production',
            validate: (config: Record<string, any>): Record<string, any> => validateAndReturnConfig(config),
        }),
        I18nModuleLocal,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
