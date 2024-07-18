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
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { RecipeQueryDto } from './dto/recipe-Query.dto';

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
    @UploadedFiles() files: { images: Array<Express.Multer.File>; video: Express.Multer.File },
  ) {
    return this.recipeService.create(createRecipeDto, files.images, files.video);
  }

  @Get()
  @SkipAuth()
  getList(@Query() query: RecipeQueryDto) {
    console.log('RecipeQueryDto: ', RecipeQueryDto);
    const {
      searchKeyword,
      status,
      size,
      categoryId,
      authorId,
      rate,
      sortByRate,
      sortByDate,
      sortByPrice,
      pageNumber,
      pageSize,
    } = query;
    return this.recipeService.getList(
      searchKeyword,
      status,
      size,
      categoryId,
      authorId,
      rate,
      sortByRate,
      sortByDate,
      sortByPrice,
      pageNumber,
      pageSize,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
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
