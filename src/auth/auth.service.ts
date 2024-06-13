import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '../users/entities/user.entity';
import dataSource from '../database/data-source';
import { RefreshToken } from '../users/entities/refresh_token.entity';
import { generateDate } from 'src/utils/data-generator';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private async searchForUser(searchObj: { [key: string]: string }) {
    const user = await dataSource.getRepository(User).findOne({
      where: {
        ...searchObj,
      },
    });
    if (!user) {
      throw new NotFoundException('invalid credentials');
    }
    return user;
  }

  private async validateUserPassword(loginDto: LoginDTO, userPassword: string) {
    console.log('userPassword: ', userPassword);
    console.log('loginDto.password: ', loginDto.password);
    return await bcrypt.compare(loginDto.password, userPassword);
  }

  private async generateAccessToken(payload: { id: string; role: UserRole }) {
    return this.jwtService.sign(payload);
  }

  private async generateRefreshToken(userId: string, expirationDate: number) {
    console.log('userId: ', userId);
    const refreshTokenUuid = uuidv4();

    try {
      let existingRefreshToken = await dataSource
        .getRepository(RefreshToken)
        .findOne({
          where: { user: { id: userId } },
        });

      if (existingRefreshToken) {
        // Update the existing refresh token
        existingRefreshToken.refreshToken = refreshTokenUuid;
        existingRefreshToken.expirationDate = generateDate(expirationDate);
      } else {
        // Create a new refresh token
        existingRefreshToken = dataSource.getRepository(RefreshToken).create({
          user: { id: userId },
          refreshToken: refreshTokenUuid,
          expirationDate: generateDate(expirationDate),
        });
      }

      // Save the refresh token update or create
      await dataSource.getRepository(RefreshToken).save(existingRefreshToken);
    } catch (error) {
      console.log('error: ', error);
      throw new InternalServerErrorException(
        'failed to generate refresh token',
      );
    }
    return refreshTokenUuid;
  }

  public async login(loginDto: LoginDTO) {
    // 1) Search for user
    const searchObj = loginDto.username
      ? { username: loginDto.username }
      : loginDto.email
        ? { email: loginDto.email }
        : loginDto.phoneNumber
          ? { phoneNumber: loginDto.phoneNumber }
          : null;
    const foundUser = await this.searchForUser(searchObj);
    console.log('foundUser: ', foundUser);
    // 2) Validate credentials
    const validCredentials = await this.validateUserPassword(
      loginDto,
      foundUser.password,
    );
    console.log('validCredentials: ', validCredentials);
    if (!validCredentials) {
      throw new NotFoundException('invalid credentials');
    }
    // 3) Generate tokens

    const accessToken = await this.generateAccessToken({
      id: foundUser.id,
      role: foundUser.role,
    });

    const refreshToken = await this.generateRefreshToken(
      foundUser.id,
      this.configService.get('REFRESH_TOKEN_EXPIRATION'),
    );
    const tokens = {
      accessToken,
      refreshToken,
    };
    return tokens;
  }

  public async protect() {}
}
