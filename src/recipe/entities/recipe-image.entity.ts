import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity({ name: 'recipe_image' })
export class RecipeImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ primary: true })
  name: string;

  // Relations
  @ManyToOne(() => Recipe, (recipe) => recipe.images)
  @JoinColumn({ name: 'recipeId' })
  recipe: Relation<Recipe>;
}
