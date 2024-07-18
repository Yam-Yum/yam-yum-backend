import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class UpdateQuantityDto {
  @IsNotEmpty()
  @IsUUID()
  cartItemId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;
}
