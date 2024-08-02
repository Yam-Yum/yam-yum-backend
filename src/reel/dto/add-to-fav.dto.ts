import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddToFavoriteDto {
  @IsNotEmpty()
  @IsUUID()
  recipeId: string;
}
