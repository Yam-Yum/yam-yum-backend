import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestOtpDto {
  @ApiProperty({ example: '012345678', required: true })
  @IsString()
  phoneNumber: string;
}
