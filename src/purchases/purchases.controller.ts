import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchaseService: PurchasesService) {}

  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  async findAll(@Param('tenantId') tenantId: string) {
    return this.purchaseService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.purchaseService.remove(id);
  }
}