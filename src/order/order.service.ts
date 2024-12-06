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
import { Response } from 'src/shared/utils/response';
import { PlaceOrderDto } from './dto/place-order.dto';
import OrderConstants from './utils/order-constants';
import { CheckoutDto } from './dto/checkout.dto';
import { orderGuestDto } from './dto/order-guest.dto';
import { MyOrdersResponseDto } from './dto/my-orders.dto';
import { ConfigService } from '@nestjs/config';

type RecipeType = { recipe: Recipe; quantity: number };
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
    private readonly _configService: ConfigService,
  ) {}

  private _getBaseImageUrl() {
    return this._configService.get('STORAGE_BASE_URL');
  }

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

  async checkout(checkoutDto: CheckoutDto) {
    // check if recipeIds exists
    const { recipes, userId } = checkoutDto;

    const recipeIds = recipes.map((recipe) => recipe.recipeId);
    // if one recipe isn't found, throw error
    const recipeExists = await this._recipeRepository.find({
      where: {
        id: In(recipeIds),
      },
    });

    if (recipeExists.length !== recipeIds.length) {
      throw new NotFoundException('Some RecipeIds does not exist');
    }

    const shippingFee = OrderConstants.SHIPPING_HANDLING_FEE;
    const systemDiscount = OrderConstants.SYSTEM_DISCOUNT;

    // calculate total price
    let totalPrice = 0;
    console.log(recipeExists);

    for (const recipe of recipeExists) {
      totalPrice += recipe.price;
    }

    const responseRecipies = {};
    for (const r of recipes) {
      responseRecipies[r.recipeId] = {
        quantity: r.quantity,
        ...recipeExists.find((recipe) => recipe.id === r.recipeId),
      };
    }
    // calculate total net price
    const totalNetPrice = totalPrice - systemDiscount + shippingFee;

    return {
      totalPrice,
      shippingFee: shippingFee,
      systemDiscount: systemDiscount,
      totalNetPrice,
      recipes: responseRecipies,
    };
  }

  async placeOrder(placeOrderDto: PlaceOrderDto, userId?: string) {
    const { fullName, phoneNumber, addressId, recipes, paymentMethod } = placeOrderDto;
    console.log(placeOrderDto);

    const addressExists = await this._addressRepository.findOneBy({ id: addressId });

    if (!addressExists) {
      throw new NotFoundException('Address does not exist');
    }

    let userExists = null;
    if (userId) {
      userExists = await this._userRepository.findOne({ where: { id: userId } });
      if (!userExists) {
        throw new NotFoundException('User does not exist');
      }
    }
    const recipeIds = recipes.map((recipe) => recipe.recipeId);
    const recipeExists = await this._recipeRepository.find({
      where: {
        id: In(recipeIds),
      },
    });

    if (recipeExists.length !== recipeIds.length) {
      throw new NotFoundException('Some RecipeIds does not exist');
    }

    const orderRecipesInfo = recipeExists.map((recipe) => {
      return {
        recipe: recipe,
        quantity: recipes.find((r) => r.recipeId === recipe.id).quantity,
      };
    });

    const orderSubTotal = this._calculateOrderSubTotal(orderRecipesInfo);
    const shippingFee = OrderConstants.SHIPPING_HANDLING_FEE;
    const systemDiscount = OrderConstants.SYSTEM_DISCOUNT;
    const orderTotal = this._calculateOrderTotal(orderSubTotal, shippingFee, systemDiscount);

    const uniqueOrderNumber = generateRandomOrderNumber();
    const order = await this._orderRepository.save({
      orderNumber: uniqueOrderNumber,
      fullName: fullName,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod,
      status: OrderStatus.CREATED,
      user: userExists,
      address: addressExists,
      recipes: recipeExists,
      itemsSubtotal: orderSubTotal,
      shippingFee: shippingFee,
      discount: systemDiscount,
      orderTotal: orderTotal,
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

    return {
      orderId: order.id,
      orderNumber: uniqueOrderNumber,
    };
  }
  async getGuestOrders(orderGuestDto: orderGuestDto) {
    const { orderIds } = orderGuestDto;
    const query = this._orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.recipes', 'recipe')
      .leftJoinAndSelect('recipe.images', 'image')
      .where('order.userId IS NULL');

    if (orderIds) {
      query.andWhere('order.id IN (:...orderIds)', { orderIds });
    }

    const [orders, total] = await query.getManyAndCount();
    console.log('🚀 ~ file: order.service.ts:220 ~ orders:', orders);

    const ordersWithImages = orders.map((order) => ({
      ...order,
      recipes: order.recipes.map((recipe) => ({
        ...recipe,
        images: recipe.images.map((image) => this._getBaseImageUrl() + image.imageName),
      })),
    }));

    return {
      totalCount: total,
      orders: ordersWithImages,
    };
  }

  async getMyOrders(userId: string): Promise<MyOrdersResponseDto> {
    try {
      const query = this._orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.recipes', 'recipe')
        .leftJoinAndSelect('recipe.images', 'image')
        .where('order.user.id = :userId', { userId })
        .orderBy('order.createdAt', 'DESC');

      const [orders, total] = await query.getManyAndCount();

      const ordersWithImages = orders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        fullName: order.fullName,
        phoneNumber: order.phoneNumber,
        status: order.status,
        itemsSubtotal: order.itemsSubtotal,
        shippingFee: order.shippingFee,
        discount: order.discount,
        orderTotal: order.orderTotal,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        recipes: order.recipes.map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          preparationTimeInMinutes: recipe.preparationTimeInMinutes,
          size: recipe.size,
          price: recipe.price,
          status: recipe.status,
          rate: recipe.rate,
          orderCount: recipe.orderCount,
          createdAt: recipe.createdAt,
          updatedAt: recipe.updatedAt,
          images: recipe.images.map((image) => this._getBaseImageUrl() + image.imageName),
        })),
      }));

      return {
        totalCount: total,
        orders: ordersWithImages,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user orders');
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

  private _calculateOrderSubTotal(recipes: RecipeType[]) {
    return recipes.reduce(
      (acc: number, recipeInfo: RecipeType) => acc + recipeInfo.recipe.price * recipeInfo.quantity,
      0,
    );
  }

  private _calculateOrderTotal(orderSubTotal: number, shippingFee: number, discount: number) {
    return orderSubTotal + shippingFee - discount;
  }
}
