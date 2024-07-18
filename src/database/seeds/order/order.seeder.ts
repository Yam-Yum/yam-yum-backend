import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';

export default class OrderSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const OrderFactory = factoryManager.get(Order);
    await OrderFactory.saveMany(1000);
  }
}
