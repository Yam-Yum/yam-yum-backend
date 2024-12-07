import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBusinessProfileRequestDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  business_email: string;
}
