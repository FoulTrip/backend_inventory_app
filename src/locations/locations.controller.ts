import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { User } from '../auth/strategies/user.decorator';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Controller('locations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post()
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @User() user: AuthenticatedUser
  ) {
    return this.locationService.create(createLocationDto, user);
  }

  @Get()
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER, Role.MANAGER, Role.SALES_AGENT)
  async findAll(@User() user: AuthenticatedUser) {
    return this.locationService.findAll(user.tenantId!);
  }

  @Get(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER, Role.MANAGER, Role.SALES_AGENT)
  async findOne(
    @Param('id') id: string
  ) {
    return this.locationService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async update(
    @Body() updateLocationDto: UpdateLocationDto,
    @Param('id') id: string
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async remove(@Param() id: string) {
    return this.locationService.remove(id);
  }
}