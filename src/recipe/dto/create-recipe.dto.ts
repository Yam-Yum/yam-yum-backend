import { IsString, IsNotEmpty, IsEnum, IsOptional, IsUUID, IsNumberString } from 'class-validator';
import { RecipeSize } from '../entities/recipe.entity';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  preparationTimeInMinutes: number;

  @IsEnum(RecipeSize)
  @IsOptional()
  size?: RecipeSize;

  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;
}
