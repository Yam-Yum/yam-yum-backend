import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChiefDto } from './dto/create-chief.dto';
import { UpdateChiefDto } from './dto/update-chief.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ChiefDetailsResponseDto } from './dto/chief-details.dto';
import { RecipeService } from 'src/recipe/recipe.service';
import { UserInJWTPayload } from 'src/shared/interfaces/JWT-payload.interface';

@Injectable()
export class ChiefService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly configService: ConfigService,
    private readonly recipeService: RecipeService,
  ) {}

  private _getImageBaseUrl(): string {
    const baseUrl = this.configService.get('STORAGE_BASE_URL');
    return baseUrl;
  }

  async getChiefDetails(
    id: string,
    currentUser?: UserInJWTPayload,
  ): Promise<ChiefDetailsResponseDto> {
    // Get chief with recipes and their categories
    const chief = await this.userRepository.findOne({
      where: {
        id,
        role: UserRole.CHIEF,
      },
      relations: {
        recipes: {
          category: true,
          reviews: true,
          images: true,
          video: true,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        recipes: {
          id: true,
          title: true,
          description: true,
          ingredients: true,
          preparationTimeInMinutes: true,
          size: true,
          price: true,
          rate: true,
          orderCount: true,
          images: true,
          video: {
            id: true,
            videoName: true,
          },
          category: {
            id: true,
            name: true,
            imageName: true,
          },
          reviews: {
            id: true,
            rating: true,
          },
        },
      },
    });

    if (!chief) {
      throw new NotFoundException('Chief not found');
    }
    console.log('🚀 ~ file: chief.service.ts:66 ~ chief:', chief);

    // Calculate total reviews and average rating
    let totalReviews = 0;
    let totalRating = 0;
    chief.recipes.forEach((recipe) => {
      totalReviews += recipe.reviews.length;
      recipe.reviews.forEach((review) => {
        totalRating += review.rating;
      });
    });

    // Get unique categories
    const uniqueCategories = Array.from(
      new Set(
        chief.recipes.map((recipe) => ({
          ...recipe.category,
          id: recipe.category.id,
          name: recipe.category.name,
          imageName: this._getImageBaseUrl() + recipe.category.imageName,
        })),
      ),
    );

    const recipesWithQantitiesAndFavorites =
      await this.recipeService.patchQuantityFavoriteToRecipes(currentUser, chief.recipes);

    // new recipes with images url
    const recipesWithImages = await Promise.all(
      recipesWithQantitiesAndFavorites.map(async (recipe) => ({
        ...recipe,
        images: recipe.images.map((image) => this._getImageBaseUrl() + image),
      })),
    );

    // Transform the response
    return {
      id: chief.id,
      firstName: chief.firstName,
      lastName: chief.lastName,
      email: chief.email,
      phoneNumber: chief.phoneNumber,
      profilePicture: chief.profilePicture,
      statistics: {
        totalRecipes: chief.recipes.length,
        totalReviews: totalReviews,
        averageRating: totalReviews > 0 ? totalRating / totalReviews : 0,
      },
      categories: uniqueCategories,
      recipes: recipesWithImages,
    } as any;
  }

  create(createChiefDto: CreateChiefDto) {
    return 'This action adds a new chief';
  }

  findAll() {
    return `This action returns all chief`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chief`;
  }

  update(id: number, updateChiefDto: UpdateChiefDto) {
    return `This action updates a #${id} chief`;
  }

  remove(id: number) {
    return `This action removes a #${id} chief`;
  }
}
