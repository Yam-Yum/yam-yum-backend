import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';

export default class CartSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const CartFactory = factoryManager.get(Cart);
    await CartFactory.saveMany(100);
  }
}
