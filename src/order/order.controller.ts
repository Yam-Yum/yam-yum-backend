import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { PlaceOrderDto } from './dto/place-order.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CheckoutDto } from './dto/checkout.dto';
import { orderGuestDto } from './dto/order-guest.dto';
import { UserInJWTPayload } from 'src/shared/interfaces/JWT-payload.interface';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @SkipAuth()
  @Post('place')
  async placeOrder(@Body() placeOrderDto: PlaceOrderDto, @GetUser() user: UserInJWTPayload) {
    return await this.orderService.placeOrder(placeOrderDto, user?.id);
  }

  @SkipAuth()
  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto) {
    return await this.orderService.checkout(checkoutDto);
  }

  @SkipAuth()
  @Post('guest')
  async getGuestOrders(@Body() orderGuestDto: orderGuestDto) {
    return this.orderService.getGuestOrders(orderGuestDto);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
