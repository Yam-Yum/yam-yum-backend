import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { PaymentMethod } from '../entities/order.entity';
import { Type } from 'class-transformer';
import { RecipeDTO } from './recipe.dto';

export class PlaceOrderDto {
  @IsString()
  fullName: string;

  @IsPhoneNumber('EG')
  phoneNumber: string;

  @IsString()
  @IsUUID()
  addressId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeDTO)
  recipes: RecipeDTO[];

  @IsUUID()
  @IsOptional()
  userId: string;

  @IsEnum(PaymentMethod)
  paymentMethod: string;
}