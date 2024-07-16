// create-address.dto.ts
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { AddressType } from '../entities/address.entity';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsNumber()
  longtude: number;

  @IsNumber()
  latitude: number;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  floor?: string;

  @IsOptional()
  @IsString()
  apartmentNumber?: string;

  @IsOptional()
  @IsString()
  houseNumber?: string;

  @IsOptional()
  @IsString()
  officeNumber?: string;

  @IsOptional()
  @IsString()
  additionalDirections?: string;

  @IsOptional()
  @IsNumber()
  postalCode?: number;

  @IsEnum(AddressType)
  addressType: AddressType;
}
