import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, Relation } from 'typeorm';
import { FavoriteItem } from './favorite-item.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.favorite, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @OneToMany(() => FavoriteItem, (favoriteItem) => favoriteItem.favorite)
  favoriteItems: Relation<FavoriteItem[]>;
}
