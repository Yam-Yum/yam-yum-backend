import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryProvider } from './providers/category.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import dataSource from 'src/database/data-source';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CategoryService,
    ...CategoryProvider,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    FilesService,
  ],
  controllers: [CategoryController],
  exports: [...CategoryProvider],
})
export class CategoryModule {}
