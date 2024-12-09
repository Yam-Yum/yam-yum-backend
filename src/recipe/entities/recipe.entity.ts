import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeImage } from './recipe-image.entity';
import { RecipeVideo } from './recipe-video.entity';
import { CartItem } from 'src/cart/entities/cartItem.entity';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';

export enum RecipeStatus {
  Draft = 'Draft',
  PendingApproval = 'PendingApproval',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Inactive = 'Inactive',
  Archived = 'Archived',
}

export enum RecipeSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge',
}

@Entity({ name: 'recipe' })
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  ingredients: string;

  @Column({ type: 'int' })
  preparationTimeInMinutes: number;

  @Column({ type: 'enum', enum: RecipeSize, default: RecipeSize.Small })
  size: RecipeSize;

  @Column({ type: 'double' })
  price: number;

  @Column({
    type: 'enum',
    enum: RecipeStatus,
    default: RecipeStatus.Draft,
  })
  status: RecipeStatus;

  @Column({ type: 'float', nullable: true })
  rate: number;

  @Column({ nullable: true })
  orderCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => RecipeImage, (recipeImage) => recipeImage.recipe)
  images: Relation<RecipeImage[]>;

  @OneToOne(() => RecipeVideo, (recipeVideo) => recipeVideo.recipe)
  video: Relation<RecipeVideo>;

  @ManyToOne(() => Category, (category) => category.recipes)
  @JoinColumn({ name: 'categoryId' })
  category: Relation<Category>;

  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: 'authorId' })
  author: Relation<User>;

  @OneToMany(() => CartItem, (cartItem) => cartItem.recipe)
  cartItems: Relation<CartItem>[];

  @ManyToMany(() => Order, (order) => order.recipes)
  orders: Relation<Order[]>;

  @OneToMany(() => Review, (review) => review.recipe)
  reviews: Relation<Review>[];
}
