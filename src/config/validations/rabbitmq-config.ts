import { IsString, IsNumber } from 'class-validator';

/**
 *
 */
export class RabbitMQConfig {
    @IsString()
    public RABBITMQ_HOST: string;

    @IsNumber()
    public RABBITMQ_PORT: number;

    @IsString()
    public RABBITMQ_USER: string;

    @IsString()
    public RABBITMQ_PASS: string;
}
