import { IsString, IsNumber, IsBoolean } from 'class-validator';

/**
 * Application configuration.
 */
export class AppConfig {
    @IsNumber()
    public APP_PORT: number;

    @IsString()
    public APP_NAME: string;

    @IsString()
    public APP_URL: string;

    @IsBoolean()
    public APP_DEBUG: boolean;

    @IsString()
    public APP_FALLBACK_LANGUAGE: string;

    @IsString()
    public APP_LOG_LEVEL: string;

    @IsString()
    public APP_LOG_SERVICE: string;

    @IsString()
    public API_PREFIX: string;

    @IsString()
    public NODE_ENV: string;
}
