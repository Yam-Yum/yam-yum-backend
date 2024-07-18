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

@Injectable()
export class CartService {
  constructor(
    @Inject(RecipeProviderToken)
    private readonly _recipeRepository: Repository<Recipe>,
    @Inject(cartItemProviderToken)
    private readonly _cartItemRepository: Repository<CartItem>,
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

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
