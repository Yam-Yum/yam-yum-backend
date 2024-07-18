import { setSeederFactory } from 'typeorm-extension';
import { Review } from 'src/review/entities/review.entity';
import { Recipe, RecipeStatus } from 'src/recipe/entities/recipe.entity';
import dataSource from 'src/database/data-source';
import { User, UserRole } from 'src/users/entities/user.entity';

export default setSeederFactory(Review, async (faker) => {
  const review = new Review();

  review.rating = faker.number.int({ min: 1, max: 5 });
  review.comment = faker.lorem.sentence();

  const recipeRepository = dataSource.getRepository(Recipe);
  const recipes = await recipeRepository.find({
    where: { status: RecipeStatus.Approved },
  });
  review.recipe = faker.helpers.arrayElement(recipes);

  const userRepository = dataSource.getRepository(User);
  const users = await userRepository.find({
    where: { role: UserRole.CLIENT },
  });
  review.user = faker.helpers.arrayElement(users);

  review.createdAt = new Date();
  review.updatedAt = new Date();

  return review;
});
