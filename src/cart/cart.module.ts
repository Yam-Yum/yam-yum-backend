import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProvider } from './providers/cart.provider';
import dataSource from 'src/database/data-source';
import { RecipeProvider } from 'src/recipe/providers/recipe.provider';
import { cartItemProvider } from './providers/cart-item.provider';
import { AddressProvider } from 'src/users/providers/address.provider';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    ...cartProvider,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    ...RecipeProvider,
    ...cartItemProvider,
    ...AddressProvider,
  ],
  exports: [...cartProvider, ...RecipeProvider, ...cartItemProvider, ...AddressProvider],
})
export class CartModule {}
