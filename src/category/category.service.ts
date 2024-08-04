import { FilesService } from './../files/files.service';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { categoryProviderToken } from './providers/category.provider';
import { QueryFailedError, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(categoryProviderToken)
    private readonly categoryRepository: Repository<Category>,
    private readonly filesService: FilesService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    try {
      const { name } = createCategoryDto;

      // Upload Category Image To S3
      const categoryImageNameOnServer = await this.filesService.uploadFileToS3(image);

      // Create New Category
      return await this.categoryRepository.save({
        name,
        image: categoryImageNameOnServer || null,
      });
    } catch (error) {
      // Checks if category name already exists ? Throw Duplicate Error: Throw Server Error
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new ConflictException('Category name already exists');
      } else {
        throw new InternalServerErrorException('Failed to create category');
      }
    }
  }

  async getList() {
    try {
      let allCategories = await this.categoryRepository.find();

      // Get Image from S3
      allCategories =
        allCategories.length > 0
          ? await Promise.all(
              allCategories.map(async (category) => {
                if (category.image)
                  category.image = await this.filesService.getFileFromS3(category.image);
                delete category.deletedAt;
                return category;
              }),
            )
          : [];

      return allCategories;
    } catch (error) {}
    throw new InternalServerErrorException('Failed to retrieve categories');
  }

  async get(id: string) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) throw new NotFoundException('Category not found');

      // Get Image from S3
      if (category.image) category.image = await this.filesService.getFileFromS3(category.image);

      delete category.deletedAt;
      return category;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, image: Express.Multer.File) {
    try {
      let updateCategoryResult!: any;

      if (image) {
        // Upload Category Image To S3
        const categoryImageNameOnServer = await this.filesService.uploadFileToS3(image);

        updateCategoryResult = await this.categoryRepository.update(id, {
          ...updateCategoryDto,
          image: categoryImageNameOnServer || null,
        });
      } else {
        updateCategoryResult = await this.categoryRepository.update(id, updateCategoryDto);
      }
      if (updateCategoryResult.affected === 0) throw new NotFoundException('Category not found');

      return { id };
    } catch (error) {
      throw error;
    }
  }

  async softDelete(userId: string): Promise<void> {
    await this.categoryRepository.update(userId, { deletedAt: new Date() });
  }

  async restore(userId: string): Promise<void> {
    await this.categoryRepository.update(userId, { deletedAt: null });
  }
}
