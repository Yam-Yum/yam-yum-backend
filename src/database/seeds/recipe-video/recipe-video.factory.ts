import { setSeederFactory } from 'typeorm-extension';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import dataSource from 'src/database/data-source';
import { RecipeVideo } from 'src/recipe/entities/recipe-video.entity';

export default setSeederFactory(RecipeVideo, async (faker) => {
  const recipeVideo = new RecipeVideo();

  recipeVideo.videoName = faker.helpers.arrayElement([]);

  const recipeRepository = dataSource.getRepository(Recipe);
  const recipes = await recipeRepository.find({
    where: { video: null },
  });
  recipeVideo.recipe = faker.helpers.arrayElement(recipes);

  return recipeVideo;
});
