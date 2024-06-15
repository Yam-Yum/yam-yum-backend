import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({
    example: 'Dairy',
    description: 'The name of the category',
    required: true,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The image of the category',
    required: false,
  })
  image: string;
}
