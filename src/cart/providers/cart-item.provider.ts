import { CartItem } from 'src/cart/entities/cartItem.entity';
import { DataSource } from 'typeorm';

export const cartItemProviderToken = 'CART_ITEM_REPOSITORY';

export const cartItemProvider = [
  {
    provide: cartItemProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CartItem),
    inject: ['DATA_SOURCE'],
  },
];
