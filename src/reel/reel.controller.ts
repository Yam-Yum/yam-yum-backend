import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReelService } from './reel.service';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { ReelsQueryDto } from './dto/reels-query.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('reels')
export class ReelController {
  constructor(private readonly reelService: ReelService) {}

  @SkipAuth()
  @Get()
  async getReels(@Query() query: ReelsQueryDto) {
    const { pageNumber, pageSize } = query;
    return await this.reelService.getReels(pageNumber, pageSize);
  }

  @Get(':videoId/like')
  async toggleLikeReel(@GetUser('id') userId: string, @Param('videoId') videoId: string) {
    return await this.reelService.toggleLikeReel(userId, videoId);
  }

  @Post('comment')
  async addComment(@GetUser('id') userId: string, @Body() addCommentDto: AddCommentDto) {
    return await this.reelService.addComment(userId, addCommentDto);
  }

  @Patch('comment')
  async updateComment(@GetUser('id') userId: string, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.reelService.updateComment(userId, updateCommentDto);
  }
}
