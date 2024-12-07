import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BusinessProfileRequestService } from './business-profile-request.service';
import { CreateBusinessProfileRequestDto } from './dto/create-business-profile-request.dto';
import { UpdateBusinessProfileRequestDto } from './dto/update-business-profile-request.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserInJWTPayload } from 'src/shared/interfaces/JWT-payload.interface';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('business-profile-requests')
@Controller('business-profile-requests')
@ApiBearerAuth('JWT-auth')
export class BusinessProfileRequestsController {
  constructor(private readonly businessProfileRequestService: BusinessProfileRequestService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new business profile request' })
  create(@Body() createDto: CreateBusinessProfileRequestDto, @GetUser() user: UserInJWTPayload) {
    return this.businessProfileRequestService.create(createDto, user.id);
  }

  @Get()
  findAll() {
    return this.businessProfileRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessProfileRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessProfileRequestDto: UpdateBusinessProfileRequestDto,
  ) {
    return this.businessProfileRequestService.update(+id, updateBusinessProfileRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessProfileRequestService.remove(+id);
  }
}
