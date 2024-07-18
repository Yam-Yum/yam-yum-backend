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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Provide JwtAuthGuard Global
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
