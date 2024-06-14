import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { UserGender } from 'src/users/entities/user.entity';

export class SignupDto {
  @ApiProperty({ example: 'hassan', required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'kamel', required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '01223233323', required: true })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'hassan.kamel@gmail.com', required: true })
  @IsString()
  email: string;

  @ApiProperty({ example: 'hassan-kamel', required: true })
  @IsString()
  username: string;

  @ApiProperty({ example: 'HASSAN#TY87', required: true })
  @IsString()
  password: string;

  @ApiProperty({ example: '2022-01-01', required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOfBirth: Date;

  @IsEnum(UserGender)
  @ApiProperty({ enum: UserGender, example: UserGender.MALE, required: true })
  gender: UserGender;
}
