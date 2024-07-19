import { CartService } from './../cart/cart.service';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { In, Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { orderProviderToken } from './providers/order.provider';
import { addressProviderToken } from 'src/users/providers/address.provider';
import { Address } from 'src/users/entities/address.entity';
import { userProviderToken } from 'src/users/providers/user.provider';
import { User } from 'src/users/entities/user.entity';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { generateRandomOrderNumber } from './utils/generate-order-number';
import { Response } from 'src/utils/response';

@Injectable()
export class OrderService {
  constructor(
    // private readonly _cartService: CartService,
    @Inject(RecipeProviderToken)
    private readonly _recipeRepository: Repository<Recipe>,
    @Inject(orderProviderToken)
    private readonly _orderRepository: Repository<Order>,
    @Inject(addressProviderToken)
    private readonly _addressRepository: Repository<Address>,
    @Inject(userProviderToken)
    private readonly _userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { fullName, phoneNumber, addressId, recipeIds, userId, paymentMethod } = createOrderDto;

      const addressExists = await this._addressRepository.findOneBy({ id: addressId });

      let userExists = null;
      if (userId) {
        userExists = await this._userRepository.findOne({ where: { id: userId } });
        if (!userExists) {
          throw new NotFoundException('User does not exist');
        }
      }

      const recipeExists = await this._recipeRepository.find({
        where: {
          id: In(recipeIds),
        },
      });

      const uniqueOrderNumber = generateRandomOrderNumber();
      await this._orderRepository.save({
        orderNumber: uniqueOrderNumber,
        fullName: fullName,
        phoneNumber: phoneNumber,
        paymentMethod: paymentMethod,
        status: OrderStatus.CREATED,
        user: userExists,
        address: addressExists,
        recipes: recipeExists,
        itemsSubtotal: 100,
        shippingFee: 20,
      });

      for (const recipeId of recipeIds) {
        const recipe = await this._recipeRepository.findOne({
          where: { id: recipeId },
        });
        if (recipe) {
          recipe.orderCount++;
          await this._recipeRepository.save(recipe);
        }
      }

      return new Response('Order Placed', [{ orderNumber: uniqueOrderNumber }]).created();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  findAll() {
    return `This action returns all order`;
  }
  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
