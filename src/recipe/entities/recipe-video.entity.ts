import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { Like } from 'src/reel/entities/like.entity';
import { Comment } from 'src/reel/entities/comment.entity';

@Entity('recipe_videos')
export class RecipeVideo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  videoName: string;

  @Column()
  likesCount: number;

  // Relations
  @OneToOne(() => Recipe, (recipe) => recipe.video)
  @JoinColumn({ name: 'recipeId' })
  recipe: Relation<Recipe>;

  @OneToMany(() => Like, (like) => like.recipeVideo)
  likes: Relation<Like>;

  @OneToMany(() => Comment, (comment) => comment.recipeVideo)
  comments: Relation<Comment>;
}
