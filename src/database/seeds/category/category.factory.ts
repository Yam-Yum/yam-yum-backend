import { setSeederFactory } from 'typeorm-extension';
import { Category } from 'src/category/entities/category.entity';

export default setSeederFactory(Category, async (faker) => {
  const category = new Category();

  category.name = faker.string.alpha({ length: 10 });
  category.imageName = faker.image.urlLoremFlickr({ category: 'food' });
  category.createdAt = new Date();
  category.updatedAt = new Date();

  return category;
});
