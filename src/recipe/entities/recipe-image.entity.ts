import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity({ name: 'recipe_image' })
export class RecipeImage {
  @Column({ primary: true })
  url: string;

  // Relations
  @ManyToOne(() => Recipe, (recipe) => recipe.images)
  recipe: Relation<Recipe>;
}
