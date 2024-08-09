import { FilesService } from './../files/files.service';
import {
  BadRequestException,
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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(categoryProviderToken)
    private readonly categoryRepository: Repository<Category>,
    private readonly filesService: FilesService,
    private readonly _configService: ConfigService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const { name } = createCategoryDto;

    const categoryExists = await this.categoryRepository.findOneBy({ name });

    if (categoryExists) throw new BadRequestException('Category Name already exists');

    // Upload Category Image To S3
    const categoryImageNameOnServer = await this.filesService.uploadFileToS3(image);

    // Create New Category
    return await this.categoryRepository.save({
      name,
      imageName: categoryImageNameOnServer || null,
    });
  }

  async getList() {
    let allCategories = await this.categoryRepository.find();

    const imagesBaseUrl = this._configService.get<string>('STORAGE_BASE_URL');

    // Get Image from S3
    allCategories =
      allCategories.length > 0
        ? await Promise.all(
            allCategories.map(async (category) => {
              delete category.deletedAt;
              return { ...category, image: imagesBaseUrl + category.imageName };
            }),
          )
        : [];

    return allCategories;
  }

  async get(id: string) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) throw new NotFoundException('Category not found');

      const imagesBaseUrl = this._configService.get<string>('STORAGE_BASE_URL');

      delete category.deletedAt;
      return { ...category, image: imagesBaseUrl + category.imageName };
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
          imageName: categoryImageNameOnServer || null,
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
