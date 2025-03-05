import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryItemDto } from './dto/create-inventory.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../users/dto/create-user.dto';
import { User } from '../auth/strategies/user.decorator';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async create(
    @Body() createInventoryItemDto: CreateInventoryItemDto,
    @User() user: AuthenticatedUser
  ) {
    return this.inventoryService.create(createInventoryItemDto, user);
  }

  @Get()
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER, Role.MANAGER, Role.SALES_AGENT)
  async findAll(@User() user: AuthenticatedUser) {
    return this.inventoryService.findAll(user.tenantId);
  }

  @Get(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER, Role.MANAGER, Role.SALES_AGENT)
  async findOne(
    @Param('id') id: string,
  ) {
    return this.inventoryService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async update(
    @Param('id') id: string, 
    @Body() updateInventoryItemDto: UpdateInventoryItemDto,
  ) {
    return this.inventoryService.update(id, updateInventoryItemDto);
  }

  @Delete(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async remove(
    @Param('id') id: string,
  ) {
    return this.inventoryService.remove(id);
  }
}