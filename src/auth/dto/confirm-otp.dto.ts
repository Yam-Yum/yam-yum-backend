import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConfirmOtpDto {
  @ApiProperty({ example: '00000', required: true })
  @IsString()
  otp: string;
}
