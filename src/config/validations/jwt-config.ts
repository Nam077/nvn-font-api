import { IsString } from 'class-validator';

/**
 *
 */
export class JwtConfig {
    @IsString()
    public ACCESS_TOKEN_EXPIRES_IN: string;

    @IsString()
    public REFRESH_TOKEN_EXPIRES_IN: string;

    @IsString()
    public VERIFY_EMAIL_TOKEN_EXPIRES_IN: string;

    @IsString()
    public RESET_PASSWORD_TOKEN_EXPIRES_IN: string;
}
