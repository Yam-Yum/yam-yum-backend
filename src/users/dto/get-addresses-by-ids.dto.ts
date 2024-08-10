import { IsArray, IsUUID } from 'class-validator';

export class GetAddressesByIdsDTO {
  @IsArray()
  @IsUUID('4', { each: true })
  addressIds: string[];
}
