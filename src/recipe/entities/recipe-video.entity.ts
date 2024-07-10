import { Column, Entity, OneToOne, Relation } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity('recipe_videos')
export class RecipeVideo {
  @Column({ primary: true })
  url: string;

  // Relations
  @OneToOne(() => Recipe, (recipe) => recipe.video)
  recipe: Relation<Recipe>;
}
