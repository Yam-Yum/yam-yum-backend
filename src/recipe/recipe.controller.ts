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
import { FileFieldsValidationInterceptor } from 'src/shared/interceptors/file-fields-validation/file-fields-validation.interceptor';

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
    FileFieldsValidationInterceptor,
  )
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFiles()
    files: { images: Array<Express.Multer.File>; video: Array<Express.Multer.File> },
  ) {
    return this.recipeService.create(createRecipeDto, files.images, files.video?.[0]);
  }

  @Post('list')
  @SkipAuth()
  getList(@Body() body: RecipeQueryDto, @GetUser() user: UserInJWTPayload) {
    console.log('user: ', user);
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
