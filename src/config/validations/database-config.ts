import { IsString, IsNumber } from 'class-validator';

/**
 *
 */
export class DatabaseConfig {
    @IsString()
    public DB_HOST: string;

    @IsNumber()
    public DB_PORT: number;

    @IsString()
    public DB_USERNAME: string;

    @IsString()
    public DB_PASSWORD: string;

    @IsString()
    public DB_DATABASE: string;
}
