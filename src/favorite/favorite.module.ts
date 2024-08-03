import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteItem } from './entities/favorite-item.entity';
import { Favorite } from './entities/favorite.entity';
import { FavoriteProvider } from './providers/favorite.provider';
import { FavoriteItemProvider } from './providers/favorite-item.provider';
import dataSource from 'src/database/data-source';
import { UsersModule } from 'src/users/users.module';
import { RecipeModule } from 'src/recipe/recipe.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, FavoriteItem]),
    UsersModule,
    RecipeModule,
    FilesModule,
  ],
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    ...FavoriteProvider,
    ...FavoriteItemProvider,
    { provide: 'DATA_SOURCE', useValue: dataSource },
  ],
  exports: [...FavoriteProvider, ...FavoriteItemProvider],
})
export class FavoriteModule {}
