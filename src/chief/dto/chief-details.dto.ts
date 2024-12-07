import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export class ChiefStatisticsDto {
  @ApiProperty({ description: 'Total number of recipes by the chief' })
  totalRecipes: number;

  @ApiProperty({ description: 'Total number of reviews across all recipes' })
  totalReviews: number;

  @ApiProperty({ description: 'Average rating across all reviews' })
  averageRating: number;
}

export class ChiefDetailsResponseDto {
  @ApiProperty({ description: 'Chief ID' })
  id: string;

  @ApiProperty({ description: 'Chief first name' })
  firstName: string;

  @ApiProperty({ description: 'Chief last name' })
  lastName: string;

  @ApiProperty({ description: 'Chief email address' })
  email: string;

  @ApiProperty({ description: 'Chief phone number' })
  phoneNumber: string;

  @ApiProperty({ description: 'Chief profile picture URL' })
  profilePicture: string;

  @ApiProperty({ type: () => ChiefStatisticsDto })
  statistics: ChiefStatisticsDto;

  @ApiProperty({ type: () => [Category] })
  categories: Category[];

  @ApiProperty({ type: () => [Recipe] })
  recipes: Recipe[];
}
