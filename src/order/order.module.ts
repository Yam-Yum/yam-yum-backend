import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartService } from 'src/cart/cart.service';
import { cartProvider } from 'src/cart/providers/cart.provider';
import dataSource from 'src/database/data-source';
import { RecipeProvider } from 'src/recipe/providers/recipe.provider';
import { cartItemProvider } from 'src/cart/providers/cart-item.provider';
import { AddressProvider } from 'src/users/providers/address.provider';
import { orderProvider } from './providers/order.provider';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    CartService,
    ...orderProvider,
    ...cartProvider,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    ...RecipeProvider,
    ...cartItemProvider,
    ...AddressProvider,
  ],
})
export class OrderModule {}
