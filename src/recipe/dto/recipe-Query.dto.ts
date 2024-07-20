import { IsOptional, IsString, IsIn, IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { RecipeStatus, RecipeSize } from '../entities/recipe.entity';

export class RecipeQueryDto {
  @IsOptional()
  @IsString()
  searchKeyword?: string;

  @IsOptional()
  @IsEnum(RecipeStatus)
  status?: RecipeStatus;

  @IsOptional()
  @IsEnum(RecipeSize)
  size?: RecipeSize;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsNumberString()
  rateGreaterThan?: number;

  @IsOptional()
  @IsNumberString()
  rateLessThan?: number;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortByRate?: 'ASC' | 'DESC';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortByDate?: 'ASC' | 'DESC';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortByPrice?: 'ASC' | 'DESC';

  @IsNotEmpty()
  pageNumber: number = 1;

  @IsNotEmpty()
  pageSize: number = 10;
}
