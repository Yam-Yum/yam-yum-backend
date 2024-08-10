import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AssignToMeDto } from './dto/assign-to-me-.dto';
import { UserInJWTPayload } from 'src/shared/interfaces/JWT-payload.interface';
import { GetAddressesByIdsDTO } from './dto/get-addresses-by-ids.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Address Endpoints
  @Get('address/mine')
  async getAddresses(@GetUser('id') currentUserId: string) {
    return await this.usersService.getMyAddresses(currentUserId);
  }

  @SkipAuth()
  @Post('addresses')
  async saveAddress(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() currentUser?: UserInJWTPayload,
  ) {
    return await this.usersService.saveAddress(createAddressDto, currentUser?.id);
  }

  @SkipAuth()
  @Post('get-addresses')
  async getAddressesByIds(@Body() getAddressesByIdsDTO: GetAddressesByIdsDTO) {
    return await this.usersService.getAddressesByIds(getAddressesByIdsDTO);
  }

  // Get logged in  user info (profile endpoint)
  @Get('me')
  async getMe(@GetUser('id') loggedInUserId: string) {
    return await this.usersService.getMe(loggedInUserId);
  }

  @Post('assign-to-me')
  async assignToMe(
    @GetUser() loggedInUser: UserInJWTPayload,
    @Body() assignToMeDto: AssignToMeDto,
  ) {
    return this.usersService.assignToMe(loggedInUser, assignToMeDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @SkipAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
