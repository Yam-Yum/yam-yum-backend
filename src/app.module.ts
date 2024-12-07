import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { CartModule } from './cart/cart.module';
import { RecipeModule } from './recipe/recipe.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { FilesService } from './files/files.service';
import { ReelModule } from './reel/reel.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ChiefModule } from './chief/chief.module';
import { BusinessProfileRequestModule } from './business-profile-request/business-profile-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    FilesModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    CartModule,
    RecipeModule,
    OrderModule,
    ReviewModule,
    ReelModule,
    FavoriteModule,
    ChiefModule,
    BusinessProfileRequestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    FilesService,
  ],
})
export class AppModule {}
