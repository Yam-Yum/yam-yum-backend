import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReelService } from './reel.service';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { ReelsQueryDto } from './dto/reels-query.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AddToFavoriteDto } from './dto/add-to-fav.dto';
import { LikeReelDto } from './dto/like-reel.dto';

@Controller('reels')
export class ReelController {
  constructor(private readonly reelService: ReelService) {}

  @SkipAuth()
  @Get()
  async getReels(@Query() query: ReelsQueryDto) {
    const { pageNumber, pageSize } = query;
    return await this.reelService.getReels(pageNumber, pageSize);
  }

  @Post('like')
  async toggleFavoriteRecipe(@GetUser('id') userId: string, @Body() likeReelDto: LikeReelDto) {
    return await this.reelService.toggleLikeReel(userId, likeReelDto);
  }
}
