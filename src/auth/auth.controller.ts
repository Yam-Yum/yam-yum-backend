import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../users/dto/login.dto';
import { AuthService } from './auth.service';
import { AtLeastOneRequired } from '../pipes/at-least-one-required.pipe';
import { SkipAuth } from './decorators/skipAuthdecorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  async login(
    @Body(new AtLeastOneRequired(['email', 'phoneNumber', 'username']))
    loginDto: LoginDTO,
  ) {
    console.log('loginDto: ', loginDto);
    return this.authService.login(loginDto);
  }
}
