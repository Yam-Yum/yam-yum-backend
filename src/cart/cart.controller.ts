import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCartQuantityDTO } from './dto/update-cart-quantity.dto';

@ApiTags('Cart')
@Controller('cart')
@ApiBearerAuth('JWT-auth')
export class CartController {
  constructor(private readonly _cartService: CartService) {}

  @Post('quantity')
  async updateCartQuantity(
    @GetUser('cartId') loggedInUserCartId: string,
    @Body() updateCartQuantityDTO: UpdateCartQuantityDTO,
  ) {
    return this._cartService.updateCartQuantity(updateCartQuantityDTO, loggedInUserCartId);
  }

  @Get('/checkout')
  async cartCheckout(@GetUser() loggedInUser: any) {
    return this._cartService.cartCheckout(loggedInUser);
  }

  @Get('mine')
  async getMyCart(@GetUser('cartId') loggedInUserCartId: string) {
    return this._cartService.getMyCart(loggedInUserCartId);
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
