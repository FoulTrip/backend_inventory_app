import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { SaleService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  async findAll(@Param('tenantId') tenantId: string) {
    return this.saleService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(id, updateSaleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.saleService.remove(id);
  }
}