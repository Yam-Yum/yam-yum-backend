import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  @Allow({})
  @ApiProperty({
    example: 'hassankamel',
    required: false,
  })
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'hassan.kamel@gmail.com',
    required: false,
  })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: '012345678',
    required: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'HASSAN#TY87',
    required: true,
  })
  password: string;
}
