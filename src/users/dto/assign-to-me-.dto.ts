import { Type } from 'class-transformer';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { RecipeDTO } from 'src/order/dto/recipe.dto';

export class AssignToMeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeDTO)
  cart: RecipeDTO[];

  @IsArray()
  @IsUUID('4', { each: true })
  addressIds: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  orderIds: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  favoriteRecipeIds: string[];
}
