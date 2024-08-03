import { Entity, ManyToOne, JoinColumn, Relation, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Favorite } from './favorite.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Entity({ name: 'favorite_items' })
@Unique(['favorite', 'recipe'])
export class FavoriteItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Favorite, (favorite) => favorite.favoriteItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'favoriteId' })
  favorite: Relation<Favorite>;

  @ManyToOne(() => Recipe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipeId' })
  recipe: Relation<Recipe>;
}
