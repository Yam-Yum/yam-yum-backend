import { Body, Controller, Param, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AtLeastOneRequired } from '../pipes/at-least-one-required.pipe';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login
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
    type: LoginDto,
    description: 'use one of [ username , phoneNumber , Email ]',
  })
  async login(
    @Body(new AtLeastOneRequired(['email', 'phoneNumber', 'username']))
    loginDto: LoginDto,
  ) {
    console.log('loginDto: ', loginDto);
    return this.authService.login(loginDto);
  }

  // Signup
  @SkipAuth()
  @Post('signup/:registrationId')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 404,
    description: 'Wrong Credential, username or email is already exist ',
  })
  @ApiBody({
    type: SignupDto,
    description: '',
  })
  async signup(@Param('registrationId') registrationId: string, @Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto, registrationId);
  }

  // Request Otp
  @SkipAuth()
  @Post('request-otp')
  @ApiResponse({
    status: 200,
    description: 'Phone number has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 404,
    description: 'Wrong Credential, phone number is already exist ',
  })
  @ApiBody({
    type: RequestOtpDto,
    description: '',
  })
  async requestOtp(@Body() requestOtpDto: RequestOtpDto) {
    return this.authService.requestOtp(requestOtpDto);
  }

  // Verify Otp
  @SkipAuth()
  @Post('confirm-otp/:phoneNumber')
  @ApiResponse({
    status: 200,
    description: 'Phone number has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 404,
    description: 'Wrong Credential, phone number is already exist ',
  })
  @ApiBody({
    type: ConfirmOtpDto,
    description: '',
  })
  async confirmOtp(
    @Param('phoneNumber') phoneNumber: string,
    @Body() confirmOtpDto: ConfirmOtpDto,
  ) {
    return this.authService.confirmOtp(confirmOtpDto, phoneNumber);
  }
}
