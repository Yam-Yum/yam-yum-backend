import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { addressProviderToken } from './providers/address.provider';
import { Address } from './entities/address.entity';
import { In, QueryFailedError, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { userProviderToken } from './providers/user.provider';
import { User } from './entities/user.entity';
import { Response } from 'src/utils/response';
import { AssignToMeDto } from './dto/assign-to-me-.dto';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { orderProviderToken } from 'src/order/providers/order.provider';
import { Order } from 'src/order/entities/order.entity';
import { CartItem } from 'src/cart/entities/cartItem.entity';
import { cartProviderToken } from 'src/cart/providers/cart.provider';
import { Cart } from 'src/cart/entities/cart.entity';
import { cartItemProviderToken } from 'src/cart/providers/cart-item.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(addressProviderToken)
    private readonly _addressRepository: Repository<Address>,
    @Inject(userProviderToken)
    private readonly _userRepository: Repository<User>,
    @Inject(RecipeProviderToken)
    private readonly _recipeRepository: Repository<Recipe>,
    @Inject(orderProviderToken)
    private readonly _orderRepository: Repository<Order>,
    @Inject(cartProviderToken)
    private readonly _cartRepository: Repository<Cart>,
    @Inject(cartItemProviderToken)
    private readonly _cartItemRepository: Repository<CartItem>,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto: ', createUserDto);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto: ', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Address Services
  async getAddresses(userId: string) {
    try {
      return await this._addressRepository.findAndCountBy({ userId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async saveAddress(createAddressDto: CreateAddressDto) {
    try {
      return await this._addressRepository.save({ ...createAddressDto });
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new ConflictException('Address already exists');
      }
      throw error;
    }
  }

  async getMe(loggedInUserId: string) {
    try {
      return new Response('Logged in user info', [
        await this._userRepository.findOne({
          where: { id: loggedInUserId },
          select: [
            'id',
            'firstName',
            'lastName',
            'username',
            'email',
            'phoneNumber',
            'profilePicture',
            'role',
            'gender',
            'dateOfBirth',
          ],

          relations: ['addresses'],
        }),
      ]).success();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async assignToMe(loggedInUserId: string, assignToMeDto: AssignToMeDto) {
    console.log('loggedInUserId: ', loggedInUserId);
    const { cart, addressIds, orderIds, favoriteRecipeIds } = assignToMeDto;

    const user = await this._userRepository.findOne({
      where: { id: loggedInUserId },
      relations: ['cart', 'favorite'],
    });

    if (cart) {
      const cartItems = await Promise.all(
        cart.map(async (recipeDto) => {
          const recipe = await this._recipeRepository.findOne({
            where: { id: recipeDto.recipeId },
          });
          const cartItem = new CartItem();
          cartItem.recipe = recipe;
          cartItem.quantity = recipeDto.quantity;
          cartItem.cart = user.cart;
          return cartItem;
        }),
      );
      console.log('cartItems: ', cartItems);

      if (cartItems.length > 0) {
        await this._cartItemRepository.save(cartItems);
        user.cart.cartItems = cartItems;
      }
    }

    if (addressIds.length > 0) {
      const addresses = await this._addressRepository.findBy({ id: In(addressIds) });
      user.addresses = addresses;
    }

    if (orderIds.length > 0) {
      const orders = await this._orderRepository.findBy({ id: In(orderIds) });
      user.orders = orders;
    }

    if (favoriteRecipeIds.length > 0) {
      const favoriteRecipes = await this._recipeRepository.findBy({ id: In(favoriteRecipeIds) });
      //Todo
      // user.favoriteRecipes = favoriteRecipes;
    }

    //Todo
    // await this._userRepository.save(user);

    return {
      cartId: user.cart.id,
      //Todo
      // favoriteId : user.favorite.id
    };
  }
}
