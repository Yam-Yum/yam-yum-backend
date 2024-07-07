import { DataSource } from 'typeorm';
import { Address } from '../entities/address.entity';

export const addressProviderToken = 'ADDRESS_REPOSITORY';

export const AddressProvider = [
  {
    provide: addressProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Address),
    inject: ['DATA_SOURCE'],
  },
];
