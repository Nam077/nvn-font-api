import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

/**
 *
 */
export class EmailConfig {
    @IsString()
    public MAIL_HOST: string;

    @IsNumber()
    public MAIL_PORT: number;

    @IsBoolean()
    public MAIL_SECURE: boolean;

    @IsOptional()
    @IsString()
    public MAIL_USER?: string;

    @IsOptional()
    @IsString()
    public MAIL_PASS?: string;

    @IsBoolean()
    public MAIL_IGNORE_TLS: boolean;

    @IsBoolean()
    public MAIL_REQUIRE_TLS: boolean;

    @IsOptional()
    @IsString()
    public MAIL_DEFAULT_EMAIL?: string;

    @IsOptional()
    @IsString()
    public MAIL_DEFAULT_NAME?: string;

    @IsNumber()
    public MAIL_CLIENT_PORT: number;
}
