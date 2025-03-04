import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  async findAll(@Param('tenantId') tenantId: string) {
    return this.locationService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
