import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Address } from 'src/users/entities/address.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

export enum OrderStatus {
  CREATED = 'created',
  PREPARING = 'preparing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CASH = 'cash',
  CREDIT = 'credit',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  orderNumber: string;

  @Column('varchar')
  fullName: string;

  @Column('varchar')
  phoneNumber: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED })
  status: OrderStatus;

  @Column('float')
  itemsSubtotal: number;

  @Column('float')
  shippingFee: number;

  @Column('int')
  discount: number;

  @Column('float')
  orderTotal: number;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH })
  paymentMethod: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   Relations
  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'addressId' })
  address: Relation<Address>;

  @ManyToMany(() => Recipe, (recipe) => recipe.orders)
  recipes: Relation<Recipe[]>;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
