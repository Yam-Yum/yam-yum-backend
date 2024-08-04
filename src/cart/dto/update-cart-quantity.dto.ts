import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateCartQuantityDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  recipeId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity: number;
}
