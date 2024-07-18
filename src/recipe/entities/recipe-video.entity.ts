import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity('recipe_videos')
export class RecipeVideo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  videoName: string;

  // Relations
  @OneToOne(() => Recipe, (recipe) => recipe.video)
  @JoinColumn({ name: 'recipeId' })
  recipe: Relation<Recipe>;
}
