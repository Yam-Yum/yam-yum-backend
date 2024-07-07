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
import { QueryFailedError, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(addressProviderToken)
    private readonly addressRepository: Repository<Address>,
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
      return await this.addressRepository.findAndCountBy({ userId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async saveAddress(userId: string, createAddressDto: CreateAddressDto) {
    try {
      if (!userId) throw new BadRequestException('userId is required');

      // TODO: Check if userId exists

      return await this.addressRepository.save({ ...createAddressDto, userId });
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new ConflictException('Address already exists');
      }
      throw error;
    }
  }
}
