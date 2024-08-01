import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Registration } from './registration.entity';
import { RefreshToken } from './refresh_token.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Address } from './address.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  CHIEF = 'chief',
  GUEST = 'guest',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: UserGender;

  @Column()
  dateOfBirth: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: Relation<RefreshToken>;

  @OneToOne(() => Registration, (registration) => registration.user)
  registration: Relation<Registration>;

  @OneToMany(() => Recipe, (recipe) => recipe.author)
  recipes: Relation<Recipe[]>;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Relation<Address>[];

  @OneToOne(() => Cart, (cart) => cart.user, {
    onDelete: 'CASCADE',
  })
  cart: Relation<Cart>;

  @OneToMany(() => Order, (order) => order.user, {
    onDelete: 'CASCADE',
  })
  orders: Relation<Order[]>;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Relation<Review[]>;

  @ManyToMany(() => Recipe, (recipe) => recipe.users)
  favoriteRecipes: Relation<Recipe[]>;
}
