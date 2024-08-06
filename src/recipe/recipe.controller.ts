import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { RecipeQueryDto } from './dto/recipe-Query.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserInJWTPayload } from 'src/shared/interfaces/JWT-payload.interface';
import { createParseFilePipe } from 'src/shared/pipes/file-parse.pipe';
import { Validator } from 'class-validator';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      {
        name: 'video',
        maxCount: 1,
      },
    ]),
  )
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFiles({
      transform: async (fileRequest: {
        images: Express.Multer.File[];
        video?: Express.Multer.File[];
      }) => {
        const imagesValidators = createParseFilePipe('2MB', ['jpg', 'jpeg', 'png']);
        const videoValidators = createParseFilePipe('30MB', ['mp4', 'mkv']);
        // Check if images are present and validate
        if (!fileRequest.images || fileRequest.images.length === 0) {
          throw new BadRequestException('Images are required.');
        }

        // Check if images are present and validate
        for (const validator of imagesValidators.getValidators()) {
          const valid = await validator.isValid(fileRequest.images);
          if (!valid) {
            throw new BadRequestException(validator.buildErrorMessage(fileRequest.images));
          }
        }

        // Check if video is present and validate
        if (fileRequest.video && fileRequest.video.length > 0) {
          for (const validator of videoValidators.getValidators()) {
            const valid = await validator.isValid(fileRequest.video);
            if (!valid) {
              throw new BadRequestException(validator.buildErrorMessage(fileRequest.video));
            }
          }
        }

        return fileRequest;
      },
    })
    files: { images: Array<Express.Multer.File>; video: Array<Express.Multer.File> },
  ) {
    return this.recipeService.create(createRecipeDto, files.images, files.video?.[0]);
  }

  @Post('list')
  @SkipAuth()
  getList(@Body() body: RecipeQueryDto, @GetUser() user: UserInJWTPayload) {
    console.log('RecipeQueryDto: ', body);
    const {
      searchKeyword,
      status,
      recipeIds,
      size,
      categoryId,
      authorId,
      rateGreaterThan,
      rateLessThan,
      sortByRate,
      sortByDate,
      sortByPrice,
      pageNumber,
      pageSize,
    } = body;
    return this.recipeService.getList(
      searchKeyword,
      status,
      recipeIds,
      size,
      categoryId,
      authorId,
      rateGreaterThan,
      rateLessThan,
      sortByRate,
      sortByDate,
      sortByPrice,
      pageNumber,
      pageSize,

      user,
    );
  }

  @Get(':id')
  @SkipAuth()
  getDetails(@Param('id') id: string, @GetUser() user: UserInJWTPayload) {
    return this.recipeService.getDetails(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
