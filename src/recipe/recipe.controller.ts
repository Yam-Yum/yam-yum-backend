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
    @UploadedFiles()
    files: { images: Array<Express.Multer.File>; video: Array<Express.Multer.File> },
  ) {
    // Validate images
    const imageValidationPipe = createParseFilePipe('2MB', ['jpg', 'jpeg', 'png']);
    // Validate video
    const videoValidationPipe = createParseFilePipe('30MB', ['mp4', 'mkv']);
    // Check if images are present and validate
    if (!files.images || files.images.length === 0) {
      throw new BadRequestException('Images are required.');
    }
    // Validate images
    files.images.forEach((image) => {
      imageValidationPipe.transform(image);
    });

    // Validate video if present
    if (files.video) {
      files.video.forEach((video) => {
        videoValidationPipe.transform(video);
      });
    }

    return this.recipeService.create(createRecipeDto, files.images, files.video[0]);
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
