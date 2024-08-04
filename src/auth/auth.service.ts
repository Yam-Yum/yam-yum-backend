import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '../users/entities/user.entity';
import dataSource from '../database/data-source';
import { RefreshToken } from '../users/entities/refresh_token.entity';
import { generateDate } from 'src/shared/utils/data-generator';
import { SignupDto } from './dto/signup.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
import { Registration } from 'src/users/entities/registration.entity';
import { cartProviderToken } from 'src/cart/providers/cart.provider';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { FavoriteProviderToken } from 'src/favorite/providers/favorite.provider';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(cartProviderToken)
    private readonly _cartRepository: Repository<Cart>,
    @Inject(FavoriteProviderToken)
    private readonly _favoriteRepository: Repository<Favorite>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(loginDto: LoginDto) {
    // 1) Search for user
    const searchObj = loginDto.username
      ? { username: loginDto.username }
      : loginDto.email
        ? { email: loginDto.email }
        : loginDto.phoneNumber
          ? { phoneNumber: loginDto.phoneNumber }
          : null;
    const foundUser = await this._searchForUser(searchObj);
    console.log('foundUser: ', foundUser);

    // 2) Validate credentials
    const validCredentials = await this._validateUserPassword(loginDto, foundUser.password);
    // console.log('validCredentials: ', validCredentials);
    if (!validCredentials) {
      throw new NotFoundException('invalid credentials');
    }

    // Get User's Cart id
    let userCart = await this._cartRepository.findOne({
      where: {
        user: { id: foundUser.id },
      },
    });

    if (!userCart && foundUser.role === UserRole.CLIENT) {
      // Create cart
      const createdCart = await this._cartRepository.save({
        user: foundUser,
      });

      userCart = createdCart;
    }

    // Get User's favorite id
    let userFavorite = await this._favoriteRepository.findOne({
      where: {
        user: { id: foundUser.id },
      },
    });

    if (!userFavorite && foundUser.role === UserRole.CLIENT) {
      // Create favorite
      const createdFavorite = await this._favoriteRepository.save({
        user: foundUser,
      });

      userFavorite = createdFavorite;
    }

    // 3) Generate tokens
    const accessToken = await this._generateAccessToken({
      id: foundUser.id,
      role: foundUser.role,
      cartId: userCart?.id || null,
      favoriteId: userFavorite?.id || null,
    });

    const refreshToken = await this._generateRefreshToken(
      foundUser.id,
      this.configService.get('REFRESH_TOKEN_EXPIRATION'),
    );

    const tokens = {
      accessToken,
      refreshToken,
    };

    return tokens;
  }

  public async signup(signup: SignupDto, registrationId: string) {
    const registration = await dataSource.getRepository(Registration).findOne({
      where: { id: registrationId },
    });
    console.log('registration: ', registration);
    if (!registration) {
      throw new BadRequestException('Wrong registration Id');
    }
    //  1) check if otp is confirmed
    if (!registration.otpConfirmed) {
      throw new BadRequestException('OTP not confirmed');
    }
    //  2) check if phone number already used
    if (registration.verified) {
      throw new BadRequestException('Phone number already used');
    }

    //  2.5) check if email already used
    const userByEmail = await dataSource.getRepository(User).findOne({
      where: { email: signup.email },
    });

    if (userByEmail) {
      throw new BadRequestException('Email already used');
    }

    registration.verified = true;
    await dataSource.getRepository(Registration).save(registration);

    // console.log('new Date(signup.dateOfBirth): ', new Date(signup.dateOfBirth));
    //  3) create user
    const user = await dataSource.getRepository(User).save({
      firstName: signup.firstName,
      lastName: signup.lastName,
      email: signup.email,
      phoneNumber: signup.phoneNumber,
      password: await bcrypt.hash(signup.password, 10),
      dateOfBirth: new Date(signup.dateOfBirth),
      gender: signup.gender,
      role: UserRole.CLIENT,
      registration,
    });

    // Create Cart
    await this._cartRepository.save({
      user,
    });

    //  4) send email
    // :TODO: send email

    const loginDTO: LoginDto = {
      email: signup.email,
      password: signup.password,
      phoneNumber: null,
      username: null,
    };
    // create token
    const tokens = await this.login(loginDTO);

    return {
      message: 'User registered successfully',
      userId: user.id,
      ...tokens,
    };
  }

  public async requestOtp(requestOtpDto: RequestOtpDto) {
    const registration = await dataSource.getRepository(Registration).findOne({
      where: { phoneNumber: requestOtpDto.phoneNumber },
    });

    if (registration && registration.verified) {
      throw new NotFoundException('Phone number already used ');
    }

    await this._createOtp(requestOtpDto.phoneNumber);

    return {};
  }

  public async confirmOtp(confirmOtpDto: ConfirmOtpDto, phoneNumber: string) {
    const registration = await dataSource.getRepository(Registration).findOne({
      where: { phoneNumber },
    });

    // console.log('registration: ', registration);
    if (!registration) {
      throw new NotFoundException('Phone number is not found');
    }

    if (registration.otp !== confirmOtpDto.otp) {
      throw new BadRequestException('Wrong OTP');
    } else if (registration.otpExpireIn < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    try {
      registration.otpConfirmed = true;
      await dataSource.getRepository(Registration).save(registration);
    } catch (error) {
      throw new InternalServerErrorException('failed to confirm otp');
    }

    return {
      message: 'OTP Confirmed successfully',
      phoneNumber,
      registrationId: registration.id,
    };
  }

  // Helper functions
  private async _searchForUser(searchObj: { [key: string]: string }) {
    console.log(searchObj);
    const user = await dataSource.getRepository(User).findOne({
      where: {
        ...searchObj,
      },
    });
    // console.log('149 - foundUser: ', user);

    if (!user) {
      throw new NotFoundException('invalid credentials');
    }
    return user;
  }

  private async _validateUserPassword(loginDto: LoginDto, userPassword: string) {
    return await bcrypt.compare(loginDto.password, userPassword);
  }

  private async _generateAccessToken(payload: {
    id: string;
    role: UserRole;
    cartId: string;
    favoriteId: string;
  }) {
    return this.jwtService.sign(payload);
  }

  private async _generateRefreshToken(userId: string, expirationDate: number) {
    const refreshTokenUuid = uuidv4();

    try {
      let existingRefreshToken = await dataSource.getRepository(RefreshToken).findOne({
        where: { user: { id: userId } },
      });

      // Update the existing refresh token
      if (existingRefreshToken) {
        existingRefreshToken.refreshToken = refreshTokenUuid;
        existingRefreshToken.expirationDate = generateDate(expirationDate);
      }
      // Create a new refresh token
      else {
        existingRefreshToken = dataSource.getRepository(RefreshToken).create({
          user: { id: userId },
          refreshToken: refreshTokenUuid,
          expirationDate: generateDate(expirationDate),
        });
      }

      // Save the refresh token update or create
      await dataSource.getRepository(RefreshToken).save(existingRefreshToken);
    } catch (error) {
      throw new InternalServerErrorException('failed to generate refresh token');
    }
    return refreshTokenUuid;
  }

  private async _createOtp(phoneNumber) {
    try {
      const registration = await dataSource.getRepository(Registration).findOne({
        where: { phoneNumber },
      });
      if (!registration) {
        await dataSource.getRepository(Registration).save({
          phoneNumber,
          otp: '000000',
          otpExpireIn: generateDate(1),
          otpConfirmed: false,
        });
        return '000000';
      } else {
        await dataSource.getRepository(Registration).update(
          {
            phoneNumber,
          },
          {
            otp: '000000',
            otpExpireIn: generateDate(1),
          },
        );
        return '000000';
      }
    } catch (error) {
      throw new InternalServerErrorException('failed to create otp');
    }
  }

  private async _isPhoneNumberVerified(phoneNumber: string) {
    const registration = await dataSource.getRepository(Registration).findOne({
      where: { phoneNumber },
    });
    if (!registration) {
      throw new NotFoundException('Phone number is not found');
    }
    return registration.verified;
  }
}
