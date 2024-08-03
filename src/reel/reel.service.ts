import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RecipeVideoProviderToken } from 'src/recipe/providers/recipe-video.provider';
import { DataSource, Repository } from 'typeorm';
import { RecipeVideo } from 'src/recipe/entities/recipe-video.entity';
import { Response } from 'src/shared/utils/response';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { userProviderToken } from 'src/users/providers/user.provider';
import { User } from 'src/users/entities/user.entity';
import { LikeProviderToken } from './providers/like.provider';
import { Like } from './entities/like.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { CommentProviderToken } from './providers/comment.provider';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ReelService {
  constructor(
    @Inject(RecipeVideoProviderToken)
    private readonly _recipeVideoRepository: Repository<RecipeVideo>,
    @Inject(RecipeProviderToken)
    private readonly _recipeRepository: Repository<Recipe>,
    @Inject(userProviderToken)
    private readonly _userRepository: Repository<User>,
    private _dataSource: DataSource,
    @Inject(LikeProviderToken)
    private readonly _likeRepository: Repository<Like>,
    @Inject(CommentProviderToken)
    private readonly _commentRepository: Repository<Comment>,
    private readonly _fileService: FilesService,
  ) {}

  async getReels(pageNumber: number = 1, pageSize: number = 10) {
    try {
      const recipesVideo = await this._recipeVideoRepository.find({
        select: {
          id: true,
          videoName: true,
          recipe: {
            id: true,
          },
        },
        relations: {
          recipe: true,
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });

      return {
        totalCount: await this._recipeVideoRepository.count(),
        data: await Promise.all(
          recipesVideo.map(async (recipeVideo) => {
            return {
              id: recipeVideo.id,
              video: await this._fileService.getFileFromS3(recipeVideo.videoName),
              recipeId: recipeVideo.recipe.id,
            };
          }),
        ),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async toggleLikeReel(loggedInUserId: string, videoId: string) {
    try {
      console.log(loggedInUserId);
      // const { videoId } = likeReelDto;
      const userExists = await this._userRepository.findOne({
        where: { id: loggedInUserId },
        relations: ['likes'],
      });
      if (!userExists) {
        throw new BadRequestException('User does not exist');
      }
      const videoExists = await this._recipeVideoRepository.findOneBy({
        id: videoId,
      });
      if (!videoExists) {
        throw new BadRequestException('Video does not exist');
      }
      const likeExists = await this._dataSource
        .createQueryBuilder()
        .select('*')
        .from('likes', 'likes')
        .where('likes.userId = :userId', { userId: loggedInUserId })
        .andWhere('likes.videoId = :videoId', { videoId: videoId })
        .getRawOne();

      if (likeExists) {
        // userExists.likes = userExists.likes.filter((like) => like.id !== likeExists.id);
        // await this._userRepository.save(userExists);
        await this._likeRepository.delete(likeExists.id);

        videoExists.likesCount--;
        await this._recipeVideoRepository.save(videoExists);

        return new Response('Video Like Removed').success();
      }

      // Create like record
      const likeRecord = this._likeRepository.create({
        recipeVideo: videoExists,
        user: userExists,
      });

      await this._likeRepository.save(likeRecord);

      videoExists.likesCount++;
      await this._recipeVideoRepository.save(videoExists);

      // userExists.likes.push(likeRecord);
      // await this._userRepository.save(userExists);
      return new Response('Video Liked').success();
    } catch (error) {
      console.log('🚀 ~ ReelService ~ addRecipeToFavorite ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }

  async addComment(loggedInUserId: string, addCommentDto: AddCommentDto) {
    try {
      const { videoId, content } = addCommentDto;
      const userExists = await this._userRepository.findOne({
        where: { id: loggedInUserId },
        relations: ['comments'],
      });
      if (!userExists) {
        throw new BadRequestException('User does not exist');
      }

      const videoExists = await this._recipeVideoRepository.findOneBy({
        id: videoId,
      });
      if (!videoExists) {
        throw new BadRequestException('Video does not exist');
      }

      const commentRecord = this._commentRepository.create({
        content,
        user: userExists,
        recipeVideo: videoExists,
      });
      await this._commentRepository.save(commentRecord);

      return { id: commentRecord.id, content: commentRecord.content };
    } catch (error) {
      console.log('🚀 ~ ReelService ~ addComment ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateComment(loggedInUserId: string, updateCommentDto: UpdateCommentDto) {
    console.log('🚀 ~ ReelService ~ updateComment ~ loggedInUserId:', loggedInUserId);
    try {
      const { commentId, content } = updateCommentDto;
      const userExists = await this._userRepository.findOne({
        where: { id: loggedInUserId },
        relations: ['comments'],
      });
      if (!userExists) {
        throw new BadRequestException('User does not exist');
      }
      console.log('🚀 ~ ReelService ~ updateComment ~ loggedInUserId:', userExists.id);

      const commentExists = await this._commentRepository.findOne({
        where: { id: commentId, user: { id: userExists.id } },
      });

      if (!commentExists) {
        throw new BadRequestException('Comment does not exist');
      }

      commentExists.content = content;

      await this._commentRepository.save(commentExists);

      return commentExists.id;
    } catch (error) {
      console.log('🚀 ~ ReelService ~ addComment ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }
}
