import { RecipeVideo } from 'src/recipe/entities/recipe-video.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['recipeVideo', 'user'])
@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => RecipeVideo, (recipeVideo) => recipeVideo.likes)
  @JoinColumn({ name: 'videoId' })
  recipeVideo: Relation<RecipeVideo>;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
