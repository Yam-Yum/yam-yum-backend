import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProvider } from './providers/cart.provider';
import dataSource from 'src/database/data-source';
import { RecipeProvider } from 'src/recipe/providers/recipe.provider';
import { cartItemProvider } from './providers/cart-item.provider';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    ...cartProvider,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    ...RecipeProvider,
    ...cartItemProvider,
  ],
  exports: [...cartProvider],
})
export class CartModule {}
