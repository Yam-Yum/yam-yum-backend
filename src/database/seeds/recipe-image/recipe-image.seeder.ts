import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RecipeImage } from 'src/recipe/entities/recipe-image.entity';

export default class RecipeImageSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const RecipeImageFactory = factoryManager.get(RecipeImage);
    await RecipeImageFactory.saveMany(1000);
  }
}
