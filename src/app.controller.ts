import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipAuth } from './auth/decorators/skip-auth.decorator';
import { GetUser } from './auth/decorators/get-user.decorator';
import { UserInJWTPayload } from './shared/interfaces/JWT-payload.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipAuth()
  @Get('home')
  getHomePage(@GetUser() user: UserInJWTPayload) {
    return this.appService.getHomePage(user);
  }
}
