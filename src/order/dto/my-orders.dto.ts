import { ApiProperty } from '@nestjs/swagger';

export class RecipeWithImagesDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  preparationTimeInMinutes: number;

  @ApiProperty()
  size: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ nullable: true })
  rate: number | null;

  @ApiProperty()
  orderCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [String] })
  images: string[];
}

export class OrderWithImagesDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderNumber: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  itemsSubtotal: number;

  @ApiProperty()
  shippingFee: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  orderTotal: number;

  @ApiProperty()
  paymentMethod: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [RecipeWithImagesDto] })
  recipes: RecipeWithImagesDto[];
}
export class MyOrdersResponseDto {
  @ApiProperty()
  totalCount: number;

  @ApiProperty({ type: [OrderWithImagesDto] })
  orders: OrderWithImagesDto[];
}
