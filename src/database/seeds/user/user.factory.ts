import { User, UserGender, UserRole } from 'src/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default setSeederFactory(User, async (faker) => {
  const user = new User();

  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.phoneNumber = faker.phone.number();
  user.password = await bcrypt.hash('password', 10);
  user.profilePicture = faker.image.avatar();
  user.role = UserRole.CLIENT;
  user.gender = faker.helpers.arrayElement([UserGender.MALE, UserGender.FEMALE]);
  user.dateOfBirth = faker.date.birthdate();
  user.createdAt = new Date();
  user.updatedAt = new Date();

  return user;
});
