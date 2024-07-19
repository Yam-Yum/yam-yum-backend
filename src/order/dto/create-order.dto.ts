import { IsArray, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import { PaymentMethod } from '../entities/order.entity';

export class CreateOrderDto {
  @IsString()
  fullName: string;

  @IsPhoneNumber('EG')
  phoneNumber: string;

  @IsString()
  @IsUUID()
  addressId: string;

  @IsUUID('4', { each: true })
  recipeIds: string[];

  @IsUUID()
  @IsOptional()
  userId: string;

  @IsEnum(PaymentMethod)
  paymentMethod: string;
}
