import { PartialType } from '@nestjs/swagger';
import { CreateBusinessProfileRequestDto } from './create-business-profile-request.dto';

export class UpdateBusinessProfileRequestDto extends PartialType(CreateBusinessProfileRequestDto) {}
