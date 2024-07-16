import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Repository } from 'typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { cartItemProviderToken } from './providers/cart-item.provider';
import { CartItem } from './entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject(RecipeProviderToken)
    private readonly _recipeRepository: Repository<Recipe>,
    @Inject(cartItemProviderToken)
    private readonly _cartItemRepository: Repository<CartItem>,
  ) {}
  async addToCart(addToCartDto: AddToCartDto, loggedInUserId: string) {
    // Validate recipe id
    const { recipeId, quantity } = addToCartDto;
    const recipeExisted = await this._recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!recipeExisted) {
      throw new NotFoundException('Recipe not found');
    }

    // Get
    // Create cart item
    // const createdCartItem = await this._cartItemRepository.save({
    //   recipe: recipeExisted,
    //   quantity,
    // });
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
