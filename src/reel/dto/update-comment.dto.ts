import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsUUID()
  commentId: string;

  @IsNotEmpty()
  content: string;
}
