import { DataSource } from 'typeorm';
import { Comment } from '../entities/comment.entity';

export const CommentProviderToken = 'COMMENT_REPOSITORY';
export const CommentProvider = [
  {
    provide: CommentProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: ['DATA_SOURCE'],
  },
];
