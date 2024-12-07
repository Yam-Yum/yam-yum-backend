import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessProfileRequest } from './entities/business-profile-request.entity';
import { BusinessProfileRequestsController } from './business-profile-request.controller';
import { BusinessProfileRequestService } from './business-profile-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessProfileRequest])],
  controllers: [BusinessProfileRequestsController],
  providers: [BusinessProfileRequestService],
})
export class BusinessProfileRequestModule {}
