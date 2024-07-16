import { DataSource } from 'typeorm';
import { Cart } from '../entities/cart.entity';

export const cartProviderToken = 'CART_REPOSITORY';

export const cartProvider = [
  {
    provide: cartProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cart),
    inject: ['DATA_SOURCE'],
  },
];
