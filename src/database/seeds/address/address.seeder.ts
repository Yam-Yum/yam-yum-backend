import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Address } from 'src/users/entities/address.entity';

export default class AddressSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const AddressFactory = factoryManager.get(Address);
    await AddressFactory.saveMany(100);
  }
}
