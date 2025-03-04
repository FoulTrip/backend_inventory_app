import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryItemDto } from './dto/create-inventory.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async create(@Body() createInventoryItemDto: CreateInventoryItemDto) {
    return this.inventoryService.create(createInventoryItemDto);
  }

  @Get()
  async findAll(@Param('tenantId') tenantId: string) {
    return this.inventoryService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInventoryItemDto: UpdateInventoryItemDto) {
    return this.inventoryService.update(id, updateInventoryItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}