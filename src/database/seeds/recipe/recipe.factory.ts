import { setSeederFactory } from 'typeorm-extension';
import { Recipe, RecipeSize, RecipeStatus } from 'src/recipe/entities/recipe.entity';
import dataSource from 'src/database/data-source';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

export default setSeederFactory(Recipe, async (faker) => {
  const recipe = new Recipe();

  recipe.title = faker.string.alpha({ length: { min: 10, max: 50 } });
  recipe.description = faker.lorem.sentence();
  recipe.preparationTimeInMinutes = faker.number.int({ min: 10, max: 100 });
  recipe.size = faker.helpers.arrayElement([
    RecipeSize.Small,
    RecipeSize.Medium,
    RecipeSize.Large,
    RecipeSize.ExtraLarge,
  ]);
  recipe.price = faker.number.int({ min: 1, max: 10 });
  recipe.status = RecipeStatus.Approved;
  recipe.rate = faker.number.float({ min: 1, max: 5 });

  const userRepository = dataSource.getRepository(User);
  const authors = await userRepository.find({
    where: { role: UserRole.CHIEF },
  });
  recipe.author = faker.helpers.arrayElement(authors);

  const categoryRepository = dataSource.getRepository(Category);
  const categories = await categoryRepository.find();
  recipe.category = faker.helpers.arrayElement(categories);

  recipe.createdAt = new Date();
  recipe.updatedAt = new Date();

  return recipe;
});
