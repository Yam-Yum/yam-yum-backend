import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProvider } from './providers/cart.provider';
import dataSource from 'src/database/data-source';

@Module({
  controllers: [CartController],
  providers: [CartService, ...cartProvider, { provide: 'DATA_SOURCE', useValue: dataSource }],
  exports: [...cartProvider],
})
export class CartModule {}
