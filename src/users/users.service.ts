import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { addressProviderToken } from './providers/address.provider';
import { Address } from './entities/address.entity';
import { In, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { userProviderToken } from './providers/user.provider';
import { User } from './entities/user.entity';
import { AssignToMeDto } from './dto/assign-to-me-.dto';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { orderProviderToken } from 'src/order/providers/order.provider';
import { Order } from 'src/order/entities/order.entity';
import { CartItem } from 'src/cart/entities/cartItem.entity';
import { cartProviderToken } from 'src/cart/providers/cart.provider';
import { Cart } from 'src/cart/entities/cart.entity';
import { cartItemProviderToken } from 'src/cart/providers/cart-item.provider';
import { FavoriteItem } from 'src/favorite/entities/favorite-item.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { FavoriteItemProviderToken } from 'src/favorite/providers/favorite-item.provider';
import { FavoriteProviderToken } from 'src/favorite/providers/favorite.provider';
import { UserInJWTPayload } from 'src/shared/interfaces/JWT-payload.interface';
import { GetAddressesByIdsDTO } from './dto/get-addresses-by-ids.dto';

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
    @Inject(FavoriteProviderToken)
    private readonly _favoriteRepository: Repository<Favorite>,
    @Inject(FavoriteItemProviderToken)
    private readonly _favoriteItemRepository: Repository<FavoriteItem>,
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
  async getMyAddresses(userId: string) {
    const Addresses = await this._addressRepository.findBy({ userId });

    return {
      total: Addresses.length,
      addresses: Addresses,
    };
  }

  async saveAddress(createAddressDto: CreateAddressDto, currentUserId?: string) {
    let user: User;
    if (currentUserId) {
      user = await this._userRepository.findOneBy({ id: currentUserId });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return await this._addressRepository.save({
        ...createAddressDto,
        userId: user.id,
      });
    }

    return await this._addressRepository.save(createAddressDto);
  }

  async getAddressesByIds(getAddressesByIdsDTO: GetAddressesByIdsDTO) {
    return await this._addressRepository.findBy({
      id: In(getAddressesByIdsDTO.addressIds),
    });
  }

  async getMe(loggedInUserId: string) {
    const loggedInUserInfo = await this._userRepository.findOne({
      where: { id: loggedInUserId },
      relations: ['addresses', 'cart', 'favorite'],
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        phoneNumber: true,
        dateOfBirth: true,
        gender: true,
        profilePicture: true,
        role: true,
        addresses: true,
        cart: {
          id: true,
        },
        favorite: {
          id: true,
        },
      },
    });

    console.log('🚀 ~ UsersService ~ getMe ~ loggedInUserInfo:', loggedInUserInfo);
    return {
      ...loggedInUserInfo,
      cart: undefined,
      favorite: undefined,
      cartId: loggedInUserInfo.cart?.id,
      favoriteId: loggedInUserInfo.favorite?.id,
    };
  }

  async assignToMe(currentUser: UserInJWTPayload, assignToMeDto: AssignToMeDto) {
    const { cartRecipes, addressIds, orderIds, favoriteRecipeIds } = assignToMeDto;
    const { id: loggedInUserId, favoriteId, cartId } = currentUser;

    const user = await this._userRepository.findOne({
      where: { id: loggedInUserId },
      relations: {
        cart: {
          cartItems: true,
        },
        addresses: true,
        orders: true,
        favorite: {
          favoriteItems: true,
        },
      },
    });

    // Assign Addresses
    if (addressIds.length > 0) {
      const addresses = await this._addressRepository.findBy({
        id: In(addressIds),
        user: { id: null },
      });
      user.addresses = addresses;
    }

    if (orderIds.length > 0) {
      const orders = await this._orderRepository.findBy({ id: In(orderIds), user: { id: null } });
      user.orders = orders;
    }

    // Assign Favorite Recipes
    if (favoriteRecipeIds?.length > 0) {
      await Promise.all(
        favoriteRecipeIds.map(async (recipeId) => {
          const favoriteItemExists = await this._favoriteItemRepository.findOne({
            where: {
              favorite: { id: favoriteId },
              recipe: { id: recipeId },
            },
          });
          if (favoriteItemExists) return favoriteItemExists;
          // Create favorite item
          await this._favoriteItemRepository.save({
            recipe: { id: recipeId },
            favorite: {
              id: favoriteId,
            },
          });
        }),
      );
    }

    // Assign Cart Items
    if (cartRecipes?.length > 0) {
      await Promise.all(
        cartRecipes.map(async (recipeDto) => {
          const cartItemExists = await this._cartItemRepository.findOne({
            where: {
              cart: { id: cartId },
              recipe: { id: recipeDto.recipeId },
            },
          });
          if (cartItemExists) {
            await this._cartItemRepository.save({
              id: cartItemExists.id,
              recipe: { id: recipeDto.recipeId },
              quantity: cartItemExists.quantity + recipeDto.quantity,
              cart: {
                id: cartId,
              },
            });
          }
          // Create cart item
          await this._cartItemRepository.save({
            recipe: { id: recipeDto.recipeId },
            quantity: recipeDto.quantity,
            cart: {
              id: cartId,
            },
          });
        }),
      );
    }

    await this._userRepository.save(user);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        profilePicture: user.profilePicture,
        role: user.role,
        addresses: user.addresses.map((address) => address.id),
        cartId: user.cart.id,
        favoriteId: user.favorite.id,
        orders: user.orders.map((order) => order.id),
      },
    };
  }
}
