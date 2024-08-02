import { IsNotEmpty, IsUUID } from 'class-validator';

export class LikeReelDto {
  @IsNotEmpty()
  @IsUUID()
  recipeId: string;
}
