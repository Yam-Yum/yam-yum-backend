import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refresh_token.entity';
import { Registration } from './entities/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Registration])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
