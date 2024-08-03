import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refresh_token.entity';
import { Registration } from './entities/registration.entity';
import dataSource from 'src/database/data-source';
import { AddressProvider } from './providers/address.provider';
import { UserProvider } from './providers/user.provider';
import { RecipeProvider } from 'src/recipe/providers/recipe.provider';
import { orderProvider } from 'src/order/providers/order.provider';
import { cartProvider } from 'src/cart/providers/cart.provider';
import { cartItemProvider } from 'src/cart/providers/cart-item.provider';
import { FavoriteItemProvider } from 'src/favorite/providers/favorite-item.provider';
import { FavoriteProvider } from 'src/favorite/providers/favorite.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Registration])],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...AddressProvider,
    ...UserProvider,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    ...RecipeProvider,
    ...orderProvider,
    ...cartProvider,
    ...cartItemProvider,
    ...FavoriteProvider,
    ...FavoriteItemProvider,
  ],
  exports: [...AddressProvider, ...UserProvider],
})
export class UsersModule {}
