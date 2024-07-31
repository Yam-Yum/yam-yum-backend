import { Inject, Injectable } from '@nestjs/common';
import { RecipeVideoProviderToken } from 'src/recipe/providers/recipe-video.provider';
import { Repository } from 'typeorm';
import { RecipeVideo } from 'src/recipe/entities/recipe-video.entity';
import { Response } from 'src/utils/response';
import { skip } from 'node:test';

@Injectable()
export class ReelService {
  constructor(
    @Inject(RecipeVideoProviderToken)
    private readonly _recipeVideoRepository: Repository<RecipeVideo>,
  ) {}

  async getReels(pageNumber: number = 1, pageSize: number = 10) {
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

    return new Response('Get reels success', recipesVideo).success();
  }
}
