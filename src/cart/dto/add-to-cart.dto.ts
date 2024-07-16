import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  recipeId: string;

  @Min(0)
  @IsInt()
  quantity: number;
}
