import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { RecipeSize } from '../entities/recipe.entity';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  preparationTimeInMinutes: number;

  @IsEnum(RecipeSize)
  @IsOptional()
  size?: RecipeSize;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;
}
