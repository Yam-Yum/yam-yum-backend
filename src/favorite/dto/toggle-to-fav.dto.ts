import { IsNotEmpty, IsUUID } from 'class-validator';

export class ToggleFavoriteDto {
  @IsNotEmpty()
  @IsUUID()
  recipeId: string;
}
