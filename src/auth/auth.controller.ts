import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AtLeastOneRequired } from '../pipes/at-least-one-required.pipe';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 404,
    description: 'Wrong Credential, username or password is incorrect ',
  })
  @ApiBody({
    type: LoginDTO,
    description: 'use one of [ username , phoneNumber , Email ]',
  })
  async login(
    @Body(new AtLeastOneRequired(['email', 'phoneNumber', 'username']))
    loginDto: LoginDTO,
  ) {
    console.log('loginDto: ', loginDto);
    return this.authService.login(loginDto);
  }
}
