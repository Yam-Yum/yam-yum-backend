import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity('recipe_videos')
export class RecipeVideo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ primary: true })
  name: string;

  // Relations
  @OneToOne(() => Recipe, (recipe) => recipe.video)
  recipe: Relation<Recipe>;
}
