import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RecipeVideo } from 'src/recipe/entities/recipe-video.entity';

export default class RecipeVideoSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const RecipeVideoFactory = factoryManager.get(RecipeVideo);
    await RecipeVideoFactory.saveMany(200);
  }
}
