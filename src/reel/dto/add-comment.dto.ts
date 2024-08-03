import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddCommentDto {
  @IsNotEmpty()
  @IsUUID()
  videoId: string;

  @IsNotEmpty()
  content: string;
}
