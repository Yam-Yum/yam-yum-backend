import { IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RecipeDTO } from './recipe.dto';

export class CheckoutDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeDTO)
  recipes: RecipeDTO[];

  @IsUUID()
  @IsOptional()
  userId: string;
}
