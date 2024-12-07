import { Injectable } from '@nestjs/common';
import { Category } from './category/entities/category.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import dataSource from './database/data-source';
import { FilesService } from './files/files.service';
import { UserInJWTPayload } from './shared/interfaces/JWT-payload.interface';
import { RecipeService } from './recipe/recipe.service';
import { ConfigService } from '@nestjs/config';
// import { User, UserRole } from './users/entities/user.entity';

@Injectable()
export class AppService {
  private readonly storageBaseUrl = this.configService.get('STORAGE_BASE_URL');

  constructor(
    private readonly filesService: FilesService,
    private readonly recipeService: RecipeService,
    private readonly configService: ConfigService,
  ) {}

  async getHomePage(currentUser?: UserInJWTPayload) {
    // custom banners from images randomly
    const bannerImages = [
      'https://yam-yum-storage.s3.eu-north-1.amazonaws.com/banner1.png',
      'https://yam-yum-storage.s3.eu-north-1.amazonaws.com/banner2.png',
    ];

    // Fetch all recipes with images
    const mostPopularRecipes = await dataSource
      .getRepository(Recipe)
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.images', 'images')
      .orderBy('recipe.orderCount', 'DESC')
      .take(10)
      .getMany();

    const mostRatedRecipes = await dataSource
      .getRepository(Recipe)
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.images', 'images')
      .orderBy('recipe.rate', 'DESC')
      .take(10)
      .getMany();

    const transformedMostPopularRecipes = await this.recipeService.patchQuantityFavoriteToRecipes(
      currentUser,
      mostPopularRecipes,
    );
    const transformedMostRatedRecipes = await this.recipeService.patchQuantityFavoriteToRecipes(
      currentUser,
      mostRatedRecipes,
    );

    const categories = await dataSource.getRepository(Category).find({
      select: ['id', 'name', 'imageName'],
    });

    return {
      banners: bannerImages,
      mostPopular: transformedMostPopularRecipes,
      mostRatedRecipes: transformedMostRatedRecipes,
      categories: categories.map((category) => ({
        ...category,
        imageName: undefined,
        image: this.storageBaseUrl + category.imageName,
      })),
    };
  }

  async fix() {
    // get all recipes authors ids and update randomlly users that its role is chief to be recipe author
    // const recipes = await dataSource.getRepository(Recipe).find({
    //   relations: { author: true },
    //   select: { id: true, author: { id: true } },
    // });
    // const chiefs = await dataSource.getRepository(User).find({
    //   where: { role: UserRole.CHIEF },
    //   select: { id: true },
    // });
    // const chiefsIds = chiefs.map((chief) => chief.id);
    // for (const recipe of recipes) {
    //   const randomChiefId = chiefsIds[Math.floor(Math.random() * chiefsIds.length)];
    //   if (recipe.author.id !== randomChiefId) {
    //     recipe.author.id = randomChiefId;
    //     await dataSource.getRepository(Recipe).save(recipe);
    //   }
    // }
    // -------------------------
    // const ingredients = [
    //   'Beef patty',
    //   'Lettuce',
    //   'Tomato',
    //   'Cheese',
    //   'Ketchup',
    //   'Pickles',
    //   'Onion',
    //   'Mustard',
    //   'Bacon',
    //   'Shrimp',
    //   'Salmon',
    //   'Tuna',
    //   'Lobster',
    //   'Crab',
    //   'Scallops',
    //   'Mussels',
    //   'Calamari',
    //   'Oysters',
    //   'Chicken',
    //   'Pork',
    //   'Avocado',
    //   'Mushrooms',
    //   'Bell peppers',
    //   'Eggplant',
    //   'Zucchini',
    //   'Hummus',
    //   'Quinoa',
    // ];
    // const recipeRepository = dataSource.getRepository(Recipe);
    // const recipes = await recipeRepository.find();
    // for (const recipe of recipes) {
    //   // Get 3-7 random ingredients
    //   const numIngredients = Math.floor(Math.random() * 5) + 3;
    //   const shuffled = [...ingredients].sort(() => 0.5 - Math.random());
    //   const selectedIngredients = shuffled.slice(0, numIngredients);
    //   recipe.ingredients = selectedIngredients.join(', ');
    //   await recipeRepository.save(recipe);
    // }
    // return { message: `Updated ${recipes.length} recipes with random ingredients` };
    //  edit all chiefs images randomlly using  this list
    //   const chiefsPropfileImages = [
    //     'https://yam-yum-storage.s3.eu-north-1.amazonaws.com/unsplash_AXDTTuh-0UI.jpg',
    //     'https://yam-yum-storage.s3.eu-north-1.amazonaws.com/unsplash_iv6yNy7oBqQ.jpg',
    //     'https://yam-yum-storage.s3.eu-north-1.amazonaws.com/unsplash_pCBy1okqAu4.jpg',
    //   ];
    //   const chiefs = await dataSource.getRepository(User).find({
    //     where: { role: UserRole.CHIEF },
    //     select: { id: true, profilePicture: true },
    //   });
    //   for (const chief of chiefs) {
    //     const randomImage =
    //       chiefsPropfileImages[Math.floor(Math.random() * chiefsPropfileImages.length)];
    //     if (chief.profilePicture !== randomImage) {
    //       chief.profilePicture = randomImage;
    //       await dataSource.getRepository(User).save(chief);
    //     }
    //   }
    //   return { message: `Updated ${chiefs.length} chiefs with random profile images` };
  }
}
