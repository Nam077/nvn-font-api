import { IsString } from 'class-validator';

/**
 *
 */
export class SecretConfig {
    @IsString()
    public SECRET_ROTATION_KEY: string;
}
