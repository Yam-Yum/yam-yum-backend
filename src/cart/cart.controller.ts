import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UpdateQuantityDto } from './dto/update-quantity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(
    @GetUser('cartId') loggedInUserCartId: any,
    @Body() addToCartDto: AddToCartDto,
    // @Request() req,
  ) {
    // console.log('🚀 ~ CartController ~ req:', req);
    return this.cartService.addToCart(addToCartDto, loggedInUserCartId);
  }

  @Post('/change-quantity')
  async changeCartItemQuantity(
    @GetUser('cartId') loggedInUserCartId: any,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    return this.cartService.changeCartItemQuantity(updateQuantityDto, loggedInUserCartId);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
