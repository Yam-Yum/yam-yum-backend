import { IsNotEmpty } from 'class-validator';

export class ReelsQueryDto {
  @IsNotEmpty()
  pageNumber: number = 1;

  @IsNotEmpty()
  pageSize: number = 10;
}
