import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { createParseFilePipe } from 'src/shared/pipes/file-parse.pipe';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(createParseFilePipe('3MB', ['jpg', 'jpeg', 'png'])) image: Express.Multer.File,
  ) {
    return await this.categoryService.create(createCategoryDto, image);
  }

  @SkipAuth()
  @Get()
  async getList() {
    return this.categoryService.getList();
  }

  @SkipAuth()
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.categoryService.get(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoryService.update(id, updateCategoryDto, image);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.softDelete(id);
  }

  @Post('restore/:id')
  async restore(@Param('id') id: string) {
    return this.categoryService.restore(id);
  }
}
