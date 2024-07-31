import { Controller, Get, Query } from '@nestjs/common';
import { ReelService } from './reel.service';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { ReelsQueryDto } from './dto/reels-query.dto';

@Controller('reels')
export class ReelController {
  constructor(private readonly reelService: ReelService) {}

  @SkipAuth()
  @Get()
  async getReels(@Query() query: ReelsQueryDto) {
    const { pageNumber, pageSize } = query;
    return await this.reelService.getReels(pageNumber, pageSize);
  }
}
