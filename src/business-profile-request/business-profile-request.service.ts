import { Injectable } from '@nestjs/common';
import { CreateBusinessProfileRequestDto } from './dto/create-business-profile-request.dto';
import { UpdateBusinessProfileRequestDto } from './dto/update-business-profile-request.dto';
import { BusinessProfileRequest } from './entities/business-profile-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessProfileRequestService {
  constructor(
    @InjectRepository(BusinessProfileRequest)
    private businessProfileRequestsRepository: Repository<BusinessProfileRequest>,
  ) {}

  create(createDto: CreateBusinessProfileRequestDto, userId: string) {
    const businessProfileRequestExists = this.businessProfileRequestsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (businessProfileRequestExists) {
      // already exists Exception
      return {
        status: 409, // conflict
        message: 'Business profile request already exists',
        businessProfileRequest: businessProfileRequestExists,
      };
    }

    const request = this.businessProfileRequestsRepository.create({
      business_email: createDto.business_email,
      user: { id: userId },
    });
    return this.businessProfileRequestsRepository.save(request);
  }

  findAll() {
    return `This action returns all businessProfileRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessProfileRequest`;
  }

  update(id: number, updateBusinessProfileRequestDto: UpdateBusinessProfileRequestDto) {
    return `This action updates a #${id} businessProfileRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessProfileRequest`;
  }
}
