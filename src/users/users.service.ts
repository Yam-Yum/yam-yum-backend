import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { addressProviderToken } from './providers/address.provider';
import { Address } from './entities/address.entity';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { userProviderToken } from './providers/user.provider';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(addressProviderToken)
    private readonly _addressRepository: Repository<Address>,
    @Inject(userProviderToken)
    private readonly _userRepository: Repository<User>,
    private readonly _dataSource: DataSource,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto: ', createUserDto);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto: ', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Address Services
  async getAddresses(userId: string) {
    try {
      return await this._addressRepository.findAndCountBy({ userId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async saveAddress(createAddressDto: CreateAddressDto) {
    try {
      return await this._addressRepository.save({ ...createAddressDto });
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new ConflictException('Address already exists');
      }
      throw error;
    }
  }

  async getMe(loggedInUserId: string) {
    const loggedInUserInfo = await this._userRepository.findOne({
      where: { id: loggedInUserId },
      relations: ['addresses', 'cart', 'favorite'],
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        phoneNumber: true,
        dateOfBirth: true,
        gender: true,
        profilePicture: true,
        role: true,
        addresses: true,
        cart: {
          id: true,
        },
        favorite: {
          id: true,
        },
      },
    });

    return {
      ...loggedInUserInfo,
      cart: undefined,
      favorite: undefined,
      cartId: loggedInUserInfo.cart.id,
      favoriteId: loggedInUserInfo.favorite.id,
    };
  }
}
