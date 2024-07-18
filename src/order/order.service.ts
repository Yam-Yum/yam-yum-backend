import { CartService } from './../cart/cart.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { orderProviderToken } from './providers/order.provider';

@Injectable()
export class OrderService {
  constructor(
    // private readonly _cartService: CartService,
    @Inject(orderProviderToken)
    private readonly _orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { fullName, phoneNumber, addressId, recipeIds, userId, paymentMethod } = createOrderDto;

    await this._orderRepository.save({
      fullName,
      phoneNumber,
      address: addressId,
      recipeIds,
      user: userId,
      paymentMethod,
      status: 'pending',
      shippingFee: 0.0,
      itemsSubtotal: 0.0,
      orderNumber: 'asdvasbk',
      recipes: recipeIds,
      // orderCount: 1,
    });
  }
  findAll() {
    return `This action returns all order`;
  }
  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
