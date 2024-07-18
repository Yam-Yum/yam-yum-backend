import { setSeederFactory } from 'typeorm-extension';
import { User } from 'src/users/entities/user.entity';
import { Address, AddressType } from 'src/users/entities/address.entity';
import dataSource from 'src/database/data-source';

export default setSeederFactory(Address, async (faker) => {
  const address = new Address();

  address.title = faker.string.alpha({ length: { min: 20, max: 100 } });
  address.longtude = parseFloat(faker.location.longitude().toString());
  address.latitude = parseFloat(faker.location.latitude().toString());
  address.country = faker.location.country();
  address.state = faker.location.state();
  address.city = faker.location.city();
  address.street = faker.location.street();
  address.floor = faker.number.int({ min: 1, max: 10 }).toString();
  address.apartmentNumber = faker.number.int({ min: 1, max: 1000 }).toString();
  address.houseNumber = faker.number.int({ min: 1, max: 100 }).toString();
  address.officeNumber = faker.number.int({ min: 1, max: 100 }).toString();
  address.additionalDirections = faker.lorem.sentence();
  address.postalCode = faker.number.int({ min: 10000, max: 99999 });
  address.addressType = faker.helpers.arrayElement([
    AddressType.HOME,
    AddressType.WORK,
    AddressType.OTHER,
  ]);
  address.isActive = true;

  // Fetch random user
  const userRepository = dataSource.getRepository(User);
  const users = await userRepository.find();
  address.user = faker.helpers.arrayElement(users);

  address.createdAt = new Date();
  address.updatedAt = new Date();

  return address;
});
