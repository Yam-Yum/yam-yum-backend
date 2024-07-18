import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  recipeId: string;
}
