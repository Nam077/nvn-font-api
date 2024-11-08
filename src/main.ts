import * as os from 'os';

import { VersioningType, type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { find, flatten, values } from 'lodash';
import { I18nValidationPipe } from 'nestjs-i18n';

import { AppModule } from '@/app.module';
import type { AppConfig } from '@/config';

/**
 * Initialize the application.
 *
 * @param {INestApplication} app - The application instance.
 * @returns {void} - The return type.
 * @example \`initApp(app)`
 */
const initApp = (app: INestApplication): void => {
    app.useGlobalPipes(new I18nValidationPipe());
    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.enableCors();
};

const buildSwagger = (app: INestApplication): void => {
    const options = new DocumentBuilder()
        .setTitle('API')
        .setDescription('API Documentation')
        .setVersion('1.0')
        .addTag('API')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
};

const getLocalIpAddress = (): string => {
    const networkInterfaces = os.networkInterfaces();
    const addresses = flatten(values(networkInterfaces));

    const ipv4Address = find(addresses, (address) => address?.family === 'IPv4');

    return ipv4Address ? ipv4Address.address : '';
};

/**
 * Bootstrap the application.
 *
 * @returns {Promise<void>} - The return type.
 * @example  \`bootstrap()`
 */
async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService<AppConfig>);
    const PORT = configService.get<number>('APP_PORT', 3000);

    // init libraries
    initApp(app);
    buildSwagger(app);
    //
    await app.listen(PORT, '0.0.0.0');
    console.info(
        `Application is running on: http://localhost:${PORT}\nLocal IP Address: http://${getLocalIpAddress()}:${PORT}`,
    );
}

(async () => {
    await bootstrap();
})();
