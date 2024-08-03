import { Body, Controller, Get, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ToggleFavoriteDto } from './dto/toggle-to-fav.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('toggle')
  toggleToFavorite(
    @GetUser('favoriteId') currentUserFavoriteId: string,
    @Body() body: ToggleFavoriteDto,
  ) {
    const { recipeId } = body;
    return this.favoriteService.toggleToFavorite(currentUserFavoriteId, recipeId);
  }

  @Get('mine')
  getMyFavorite(@GetUser('favoriteId') currentUserFavoriteId: string) {
    return this.favoriteService.getFavoriteRecipes(currentUserFavoriteId);
  }
}
