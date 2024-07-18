import { setSeederFactory } from 'typeorm-extension';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Faker } from '@faker-js/faker';
import dataSource from 'src/database/data-source';
import { Cart } from 'src/cart/entities/cart.entity';

export default setSeederFactory(Cart, async (faker: Faker) => {
  const cart = new Cart();

  // Fetch random user
  // Fetch random user
  const userRepository = dataSource.getRepository(User);
  const users = await userRepository.find({
    where: {
      role: UserRole.CLIENT,
    },
  });
  cart.user = faker.helpers.arrayElement(users);

  cart.isActive = true;
  cart.createdAt = new Date();
  cart.updatedAt = new Date();

  return cart;
});
