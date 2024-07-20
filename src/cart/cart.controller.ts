import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UpdateQuantityDto } from './dto/update-quantity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly _cartService: CartService) {}

  @Post()
  async addToCart(
    @GetUser('cartId') loggedInUserCartId: any,
    @Body() addToCartDto: AddToCartDto,
    // @Request() req,
  ) {
    // console.log('🚀 ~ CartController ~ req:', req);
    return this._cartService.addToCart(addToCartDto, loggedInUserCartId);
  }

  @Post('/change-quantity')
  async changeCartItemQuantity(
    @GetUser('cartId') loggedInUserCartId: any,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    return this._cartService.changeCartItemQuantity(updateQuantityDto, loggedInUserCartId);
  }

  @Get('/checkout')
  async cartCheckout(@GetUser() loggedInUser: any) {
    return this._cartService.cartCheckout(loggedInUser);
  }

  @Get()
  findAll() {
    return this._cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this._cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._cartService.remove(+id);
  }
}
