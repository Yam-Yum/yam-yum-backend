import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Repository } from 'typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { cartItemProviderToken } from './providers/cart-item.provider';
import { CartItem } from './entities/cartItem.entity';
import { Response } from 'src/utils/response';
import { addressProviderToken } from 'src/users/providers/address.provider';
import { Address } from 'src/users/entities/address.entity';
import OrderConstants from 'src/order/utils/order-constants';
import { cartProviderToken } from './providers/cart.provider';
import { Cart } from './entities/cart.entity';
import { FilesService } from 'src/files/files.service';

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
    // private readonly _filesService: FilesService,
  ) {}

  async addToCart(addToCartDto: AddToCartDto, loggedInUserCartId: string) {
    console.log('🚀 ~ CartService ~ addToCart ~ loggedInUserId:', loggedInUserCartId);
    // Validate recipe id
    const { recipeId } = addToCartDto;
    try {
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
      if (cartItemExists) {
        await this._cartItemRepository.save({
          id: cartItemExists.id,
          recipe: recipeExisted,
          quantity: cartItemExists.quantity + 1,
          cart: {
            id: loggedInUserCartId,
          },
        });

        return new Response('Added to cart').created();
      }

      // Create cart item
      const createdCartItem = await this._cartItemRepository.save({
        recipe: recipeExisted,
        quantity: 1,
        cart: {
          id: loggedInUserCartId,
        },
      });

      return new Response('Added to cart', [createdCartItem]).created();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async changeCartItemQuantity(updateQuantityDto, loggedInUserCartId) {
    const { cartItemId, quantity } = updateQuantityDto;
    const cartItem = await this._cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: { cart: true },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.cart.id !== loggedInUserCartId) {
      throw new NotFoundException('Cart item not found');
    }
    if (quantity == 0) {
      await this._cartItemRepository.remove(cartItem);
      return new Response('Updated cart item').success();
    }
    const updatedCartItem = await this._cartItemRepository.save({
      id: cartItem.id,
      quantity,
    });
    return new Response('Updated cart item', [updatedCartItem]).success();
  }

  async cartCheckout(loggedInUser: any) {
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

  async getMyCart(loggedInUserId: string) {
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
            images: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // get signed url
    const imageNames = cart.cartItems.map((item) =>
      item.recipe.images.map((image) => image.imageName),
    );
    // const images = await this._filesService.getMultipleFilesFromS3(imageNames.flat());

    return {
      ...cart,
      cartItems: cart.cartItems.map((item) => ({
        ...item,
        recipe: {
          ...item.recipe,
          // images,
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
