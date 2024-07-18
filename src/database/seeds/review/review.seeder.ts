import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Review } from 'src/review/entities/review.entity';

export default class ReviewSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const ReviewFactory = factoryManager.get(Review);
    await ReviewFactory.saveMany(1000);
  }
}
