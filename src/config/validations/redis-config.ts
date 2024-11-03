import { IsString, IsNumber, IsBoolean } from 'class-validator';

/**
 *
 */
export class RedisConfig {
    @IsString()
    public REDIS_HOST: string;

    @IsNumber()
    public REDIS_PORT: number;

    @IsString()
    public REDIS_PASSWORD: string;

    @IsBoolean()
    public REDIS_TLS_ENABLED: boolean;
}
