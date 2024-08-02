import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProvider } from './providers/cart.provider';
import dataSource from 'src/database/data-source';
import { RecipeProvider } from 'src/recipe/providers/recipe.provider';
import { cartItemProvider } from './providers/cart-item.provider';
import { AddressProvider } from 'src/users/providers/address.provider';
import { FilesService } from 'src/files/files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  controllers: [CartController],
  providers: [
    CartService,
    ...cartProvider,
    ...RecipeProvider,
    ...cartItemProvider,
    ...AddressProvider,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    FilesService,
  ],
  exports: [...cartProvider, ...RecipeProvider, ...cartItemProvider, ...AddressProvider],
})
export class CartModule {}
