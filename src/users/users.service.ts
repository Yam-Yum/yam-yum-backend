import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressProvider, addressProviderToken } from './providers/address.provider';
import { Address } from './entities/address.entity';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { userProviderToken } from './providers/user.provider';
import { User } from './entities/user.entity';
import { Response } from 'src/utils/response';

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
    try {
      const loggedInUserInfo = await this._userRepository.findOne({
        where: { id: loggedInUserId },
        select: [
          'id',
          'firstName',
          'lastName',
          'username',
          'email',
          'phoneNumber',
          'profilePicture',
          'role',
          'gender',
          'dateOfBirth',
        ],
      });

      const userFavList = await this._dataSource
        .createQueryBuilder()
        .select('recipeId')
        .from('user_favorite_recipes', 'ufr')
        .where('ufr.usersId = :userId', { userId: loggedInUserId })
        .getRawMany();
      console.log('🚀 ~ UsersService ~ getMe ~ userFavList:', userFavList);

      return new Response('Logged in user info', [{ loggedInUserInfo, userFavList }]).success();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
