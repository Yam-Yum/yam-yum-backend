import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Repository } from 'typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { cartItemProviderToken } from './providers/cart-item.provider';
import { CartItem } from './entities/cartItem.entity';
import { Response } from 'src/shared/utils/response';
import { addressProviderToken } from 'src/users/providers/address.provider';
import { Address } from 'src/users/entities/address.entity';
import OrderConstants from 'src/order/utils/order-constants';
import { cartProviderToken } from './providers/cart.provider';
import { Cart } from './entities/cart.entity';
import { UpdateCartQuantityDTO } from './dto/update-cart-quantity.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CartService {
  constructor(
    @Inject(RecipeProviderToken)
    private readonly _recipeRepository: Repository<Recipe>,
    @Inject(cartProviderToken)
    private readonly _cartRepository: Repository<Cart>,
    @Inject(cartItemProviderToken)
    private readonly _cartItemRepository: Repository<CartItem>,
    @Inject(addressProviderToken)
    private readonly _addressRepository: Repository<Address>,
    private readonly _configService: ConfigService,
  ) {}

  public async updateCartQuantity(
    updateCartQuantityDTO: UpdateCartQuantityDTO,
    loggedInUserCartId: string,
  ) {
    // Validate recipe id
    const { recipeId } = updateCartQuantityDTO;
    const recipeExisted = await this._recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!recipeExisted) {
      throw new NotFoundException('Recipe not found');
    }
    const cartItemExists = await this._cartItemRepository.findOne({
      where: {
        cart: { id: loggedInUserCartId },
        recipe: { id: recipeId },
      },
    });

    // Delete cart item
    if (cartItemExists && updateCartQuantityDTO.quantity == 0) {
      await this._cartItemRepository.delete({ id: cartItemExists.id });
      return { cartItemId: cartItemExists.id };
    }

    // Update cart item
    if (cartItemExists) {
      const updatedCartItem = await this._cartItemRepository.save({
        id: cartItemExists.id,
        recipe: recipeExisted,
        quantity: updateCartQuantityDTO.quantity || cartItemExists.quantity + 1,
        cart: {
          id: loggedInUserCartId,
        },
      });
      return { cartItemId: updatedCartItem.id, quantity: updatedCartItem.quantity };
    }

    // Create cart item
    const createdCartItem = await this._cartItemRepository.save({
      recipe: recipeExisted,
      quantity: updateCartQuantityDTO.quantity || 1,
      cart: {
        id: loggedInUserCartId,
      },
    });

    return { cartItemId: createdCartItem.id, quantity: createdCartItem.quantity };
  }

  public async cartCheckout(loggedInUser: any) {
    try {
      const { loggedInUserId, loggedInUserCartId } = loggedInUser;

      const cartItems = await this._cartItemRepository.find({
        where: { cart: { id: loggedInUserCartId } },
        relations: { recipe: true },
      });
      if (!cartItems || cartItems.length == 0) {
        throw new NotFoundException('Cart is empty');
      }

      const userAddress = await this._addressRepository.findOne({
        where: { user: { id: loggedInUserId } },
      });

      const cartSubTotal = this.calculateCartSubTotal(cartItems);

      // Shipping & Handling Fee
      const shippingFee = OrderConstants.SHIPPING_HANDLING_FEE;
      const systemDiscount = OrderConstants.SYSTEM_DISCOUNT;
      const cartTotal = this.calculateCartTotal(cartSubTotal, shippingFee, systemDiscount);

      return new Response('Cart checkout', [
        { CartItems: cartItems },
        { CartSubTotal: cartSubTotal },
        { ShippingFee: shippingFee },
        { discount: systemDiscount },
        { CartTotal: cartTotal },
        { UserAddress: userAddress },
      ]).success();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getMyCart(loggedInUserId: string) {
    const cart = await this._cartRepository.findOne({
      where: { id: loggedInUserId },
      relations: { cartItems: { recipe: { images: true } } },
      select: {
        id: true,
        cartItems: {
          id: true,
          quantity: true,
          recipe: {
            id: true,
            title: true,
            description: true,
            price: true,
            rate: true,
            orderCount: true,
            preparationTimeInMinutes: true,
            images: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const imagesBaseUrl = this._configService.get<string>('STORAGE_BASE_URL');

    return {
      ...cart,
      cartItems: cart.cartItems.map((item) => ({
        ...item,
        recipe: {
          ...item.recipe,
          images: item.recipe.images.map((image) => imagesBaseUrl + image.imageName),
        },
      })),
    };
  }

  public calculateCartSubTotal(cartItems: CartItem[]) {
    return cartItems.reduce(
      (acc: number, cartItem: CartItem) => acc + cartItem.recipe.price * cartItem.quantity,
      0,
    );
  }

  public calculateCartTotal(cartSubTotal: number, shippingFee: number, discount: number) {
    return cartSubTotal + shippingFee - discount;
  }

  public async clearMyCart(loggedInUserId: string) {
    await this._cartItemRepository.delete({ cart: { id: loggedInUserId } });
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    console.log('updateCartDto: ', updateCartDto);
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
