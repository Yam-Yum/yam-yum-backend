import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FilesService } from 'src/files/files.service';
import { QueryFailedError, Repository } from 'typeorm';
import { Recipe, RecipeSize, RecipeStatus } from './entities/recipe.entity';
import { RecipeProviderToken } from './providers/recipe.provider';
import { RecipeImageProviderToken } from './providers/recipe-image.provider';
import { RecipeImage } from './entities/recipe-image.entity';
import { RecipeVideo } from './entities/recipe-video.entity';
import { RecipeVideoProviderToken } from './providers/recipe-video.provider';
import { UserInJWTPayload } from 'src/shared/interfaces/JWT-payload.interface';
import { CartItem } from 'src/cart/entities/cartItem.entity';
import dataSource from 'src/database/data-source';
import { FavoriteItem } from 'src/favorite/entities/favorite-item.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(RecipeProviderToken)
    private readonly recipeRepository: Repository<Recipe>,
    @Inject(RecipeImageProviderToken)
    private readonly recipeImageRepository: Repository<RecipeImage>,
    @Inject(RecipeVideoProviderToken)
    private readonly recipeVideoRepository: Repository<RecipeVideo>,
    private readonly filesService: FilesService,
    private readonly _configService: ConfigService,
  ) {}

  async create(
    createRecipeDto: CreateRecipeDto,
    images: Array<Express.Multer.File>,
    video: Express.Multer.File,
  ) {
    // Validate Recipe Name
    const { title } = createRecipeDto;
    const recipeExists = await this.recipeRepository.findOneBy({ title });
    if (recipeExists) throw new ConflictException('Recipe Name already exists');

    // Create New Recipe
    const newRecipe = await this.recipeRepository.save({
      title: createRecipeDto.title,
      description: createRecipeDto.description,
      preparationTimeInMinutes: createRecipeDto.preparationTimeInMinutes,
      size: createRecipeDto.size,
      price: createRecipeDto.price,
      category: {
        id: createRecipeDto.categoryId,
      },
      author: { id: createRecipeDto.authorId },
    });

    // create recipe Images
    for (const image of images) {
      // Upload Recipe Image To S3
      const imageName = await this.filesService.uploadFileToS3(image);
      // Create Recipe Image
      await this._createImage(imageName, newRecipe.id);
    }

    // create video if exists
    if (video) {
      const videoName = await this.filesService.uploadFileToS3(video);
      // create Recipe video
      await this._createVideo(videoName, newRecipe.id);
    }

    return await this.recipeRepository.find({
      where: { id: newRecipe.id },
      relations: {
        category: true,
        author: true,
        video: true,
        images: true,
      },
      select: {
        images: {
          id: true,
          imageName: true,
        },
        video: {
          id: true,
          videoName: true,
        },
        category: {
          id: true,
          name: true,
        },
        author: {
          id: true,
        },
      },
    });
  }

  async getList(
    searchKeyword?: string,
    status?: RecipeStatus,
    recipeIds?: string[],
    size?: RecipeSize,
    categoryId?: string,
    authorId?: string,
    rateGreaterThan?: number,
    rateLessThan?: number,
    sortByRate?: 'ASC' | 'DESC',
    sortByDate?: 'ASC' | 'DESC',
    sortByPrice?: 'ASC' | 'DESC',
    pageNumber: number = 1,
    pageSize: number = 10,
    user?: UserInJWTPayload,
  ) {
    const query = this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.images', 'images')
      .leftJoinAndSelect('recipe.video', 'video');

    if (status) query.andWhere('recipe.status = :status', { status });
    if (size) query.andWhere('recipe.size = :size', { size });
    if (categoryId) query.andWhere('recipe.categoryId = :categoryId', { categoryId });
    if (authorId) query.andWhere('recipe.authorId = :authorId', { authorId });
    if (rateGreaterThan) query.andWhere('recipe.rate >= :rateGreaterThan', { rateGreaterThan });
    if (rateLessThan) query.andWhere('recipe.rate <= :rateLessThan', { rateLessThan });
    if (recipeIds) query.andWhere('recipe.id IN (:...recipeIds)', { recipeIds });

    if (searchKeyword) {
      query.andWhere('(recipe.title LIKE :keyword OR recipe.description LIKE :keyword)', {
        keyword: `%${searchKeyword}%`,
      });
    }

    if (sortByRate) query.addOrderBy('recipe.rate', sortByRate);
    if (sortByDate) query.addOrderBy('recipe.createdAt', sortByDate);
    if (sortByPrice) query.addOrderBy('recipe.price', sortByPrice);

    const total = await query.getCount();
    const recipes = await query
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const transformedRecipes = await this.patchQuantityFavoriteToRecipes(user, recipes);

    return {
      metaData: {
        total,
        pageNumber,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      data: transformedRecipes,
    };
  }

  async getDetails(id: string, user?: UserInJWTPayload) {
    console.log('id: ', id);
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: {
        category: true,
        author: true,
        video: true,
        images: true,
        reviews: {
          user: true,
        },
      },
      select: {
        images: {
          id: true,
          imageName: true,
        },
        video: {
          id: true,
          videoName: true,
        },
        category: {
          id: true,
          name: true,
        },
        author: {
          id: true,
          firstName: true,
          lastName: true,
          profilePicture: true,
        },
        reviews: {
          id: true,
          comment: true,
          rating: true,
          user: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    // Transform recipe to include videoUrl and imageUrls
    const transformedRecipe = await this.patchQuantityFavoriteToRecipes(user, [recipe]);

    return {
      ...transformedRecipe[0],
      ingredients: transformedRecipe[0].ingredients
        ? transformedRecipe[0].ingredients.split(',').map((ingredient) => ingredient.trim())
        : [],
    };
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    console.log('updateRecipeDto: ', updateRecipeDto);
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }

  //  helpers
  private async _createImage(imageName: string, recipeId: string): Promise<RecipeImage> {
    return await this.recipeImageRepository.save({
      imageName,
      recipe: {
        id: recipeId,
      },
    });
  }

  private async _createVideo(videoName: string, recipeId: string): Promise<RecipeVideo> {
    return await this.recipeVideoRepository.save({
      videoName,
      recipe: {
        id: recipeId,
      },
    });
  }

  // public
  async patchQuantityFavoriteToRecipes(currentUser: UserInJWTPayload, recipes: Partial<Recipe>[]) {
    const imagesBaseUrl = this._configService.get<string>('STORAGE_BASE_URL');
    // Fetch user's cart items and favorite recipes
    let cartItems = [];
    let favoriteRecipes = [];

    if (currentUser) {
      cartItems = await dataSource
        .getRepository(CartItem)
        .find({ where: { cart: { id: currentUser.cartId } }, relations: { recipe: true } });

      favoriteRecipes = await dataSource
        .getRepository(FavoriteItem)
        .find({ where: { favorite: { id: currentUser.favoriteId } }, relations: { recipe: true } });
    }

    // Helper function to transform recipes
    const transformRecipes = async (recipes: Partial<Recipe>[]) => {
      return await Promise.all(
        recipes.map(async (recipe) => {
          const cartItem = cartItems.find((item) => item.recipe?.id === recipe.id);
          const isFavorite = favoriteRecipes.some((favorite) => favorite.recipe?.id === recipe.id);

          return {
            ...recipe,
            video: recipe.video ? `${imagesBaseUrl}${recipe.video.videoName}` : null,
            images: recipe.images
              ? recipe.images.map((image) => `${imagesBaseUrl}${image.imageName}`)
              : null,
            cartQuantity: currentUser ? (cartItem ? cartItem.quantity : 0) : null,
            isFavorite: currentUser ? (isFavorite ? true : false) : null,
          };
        }),
      );
    };

    return await transformRecipes(recipes);
  }
}
