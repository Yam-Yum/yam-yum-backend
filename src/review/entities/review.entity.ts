import { Recipe } from 'src/recipe/entities/recipe.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, Relation, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum ReviewRate {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ReviewRate,
    default: ReviewRate.Five,
  })
  rating: ReviewRate;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.reviews)
  @JoinColumn({ name: 'recipeId' })
  recipe: Relation<Recipe>;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
