import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FilesService } from 'src/files/files.service';
import { QueryFailedError, Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeProviderToken } from './providers/recipe.provider';
import { RecipeImageProviderToken } from './providers/recipe-image.provider';
import { RecipeImage } from './entities/recipe-image.entity';
import { RecipeVideo } from './entities/recipe-video.entity';
import { RecipeVideoProviderToken } from './providers/recipe-video.provider';
import dataSource from 'src/database/data-source';

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
  ) {}

  async create(
    createRecipeDto: CreateRecipeDto,
    images: Array<Express.Multer.File>,
    video: Express.Multer.File,
  ) {
    try {
      let videoId = null;
      // create video if exists
      if (createRecipeDto.video) {
        const videoName = await this.filesService.uploadFileToS3(video);
        // create Recipe video
        const videoInDb = await this._createVideo(videoName);
        videoId = videoInDb.id;
      }
      // Create New Recipe
      const newRecipe = await dataSource.getRepository(Recipe).save({
        title: createRecipeDto.title,
        description: createRecipeDto.description,
        preparationTimeInMinutes: createRecipeDto.preparationTimeInMinutes,
        size: createRecipeDto.size,
        price: createRecipeDto.price,
        categoryId: createRecipeDto.categoryId,
        authorid: createRecipeDto.authorId,
        video: videoId,
      });

      // create recipe Images
      images.forEach(async (image) => {
        // Upload Recipe Image To S3
        const imageName = await this.filesService.uploadFileToS3(image);

        // Create Recipe Image
        await this._createImage(imageName, newRecipe.id);
      });
    } catch (error) {
      // Checks if Recipe title already exists ? Throw Duplicate Error: Throw Server Error
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new ConflictException('Recipe title already exists');
      } else {
        throw new InternalServerErrorException('Failed to create Recipe');
      }
    }
  }

  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }

  //  helpers
  private async _createImage(imageName: string, recipeId: string): Promise<RecipeImage> {
    return await this.recipeImageRepository.save({
      imageName,
      recipeId,
    });
  }

  private async _createVideo(videoName: string): Promise<RecipeVideo> {
    return await this.recipeVideoRepository.save({
      videoName,
    });
  }
}
