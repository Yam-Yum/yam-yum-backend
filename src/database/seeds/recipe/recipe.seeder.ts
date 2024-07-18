import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export default class RecipeSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const RecipeFactory = factoryManager.get(Recipe);
    await RecipeFactory.saveMany(200);
  }
}
