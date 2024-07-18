import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const categoryFactory = factoryManager.get(Category);
    await categoryFactory.saveMany(10);
  }
}
