import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ChiefService } from './chief.service';
import { CreateChiefDto } from './dto/create-chief.dto';
import { UpdateChiefDto } from './dto/update-chief.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ChiefDetailsResponseDto } from './dto/chief-details.dto';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';

@ApiTags('chiefs')
@Controller('chief')
export class ChiefController {
  constructor(private readonly chiefService: ChiefService) {}

  @Post()
  create(@Body() createChiefDto: CreateChiefDto) {
    return this.chiefService.create(createChiefDto);
  }

  @Get()
  findAll() {
    return this.chiefService.findAll();
  }

  @SkipAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get chief details with reviews and categories' })
  @ApiParam({ name: 'id', description: 'Chief ID' })
  @ApiResponse({
    status: 200,
    description: 'Chief details retrieved successfully',
    type: ChiefDetailsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Chief not found' })
  async getChiefDetails(@Param('id') id: string): Promise<ChiefDetailsResponseDto> {
    return await this.chiefService.getChiefDetails(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChiefDto: UpdateChiefDto) {
    return this.chiefService.update(+id, updateChiefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chiefService.remove(+id);
  }
}
