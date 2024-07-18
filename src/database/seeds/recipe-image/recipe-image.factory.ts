import { setSeederFactory } from 'typeorm-extension';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import dataSource from 'src/database/data-source';
import { RecipeImage } from 'src/recipe/entities/recipe-image.entity';

export default setSeederFactory(RecipeImage, async (faker) => {
  const recipeImage = new RecipeImage();

  recipeImage.imageName = faker.helpers.arrayElement([]);

  const recipeRepository = dataSource.getRepository(Recipe);
  const recipes = await recipeRepository.find();
  recipeImage.recipe = faker.helpers.arrayElement(recipes);

  return recipeImage;
});
