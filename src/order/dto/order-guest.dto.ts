import { IsOptional } from 'class-validator';

export class orderGuestDto {
  @IsOptional()
  orderIds: string[];
}
