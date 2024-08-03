import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { RecipeDTO } from 'src/order/dto/recipe.dto';

export class AssignToMeDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeDTO)
  cartRecipes: RecipeDTO[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  addressIds: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  orderIds: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  favoriteRecipeIds: string[];
}
