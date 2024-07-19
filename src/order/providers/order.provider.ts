import { DataSource } from 'typeorm';
import { Order } from '../entities/order.entity';

export const orderProviderToken = 'ORDER_REPOSITORY';

export const orderProvider = [
  {
    provide: orderProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
];
