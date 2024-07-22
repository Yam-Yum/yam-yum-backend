import { IsNumber, IsString, Min } from 'class-validator';

export class RecipeDTO {
  @IsString()
  recipeId: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}
