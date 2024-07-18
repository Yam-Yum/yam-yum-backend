import { setSeederFactory } from 'typeorm-extension';
import { Order, OrderStatus, PaymentMethod } from 'src/order/entities/order.entity';
import { Address } from 'src/users/entities/address.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import dataSource from 'src/database/data-source';

export default setSeederFactory(Order, async (faker) => {
  const order = new Order();

  order.orderNumber = faker.string.uuid();
  order.fullName = faker.person.fullName();
  order.phoneNumber = faker.phone.number();
  order.status = faker.helpers.arrayElement([
    OrderStatus.CREATED,
    OrderStatus.PREPARING,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
    OrderStatus.PENDING,
    OrderStatus.CANCELLED,
  ]);
  order.itemsSubtotal = parseFloat(faker.commerce.price({ min: 10, max: 100 }));
  order.shippingFee = parseFloat(faker.commerce.price({ min: 1, max: 10 }));
  order.paymentMethod = faker.helpers.arrayElement([PaymentMethod.CASH, PaymentMethod.CREDIT]);

  // Fetch random address
  const addressRepository = dataSource.getRepository(Address);
  const addresses = await addressRepository.find();
  order.address = faker.helpers.arrayElement(addresses);

  // Fetch random recipes
  const recipeRepository = dataSource.getRepository(Recipe);
  const recipes = await recipeRepository.find();
  order.recipes = faker.helpers.arrayElements(recipes, faker.datatype.number({ min: 1, max: 5 }));

  // Fetch random user
  const userRepository = dataSource.getRepository(User);
  const users = await userRepository.find({
    where: { role: UserRole.CLIENT },
  });
  order.user = faker.helpers.arrayElement(users);

  order.createdAt = new Date();
  order.updatedAt = new Date();

  return order;
});
