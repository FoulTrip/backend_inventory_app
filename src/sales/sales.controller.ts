import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../users/dto/create-user.dto';
import { User } from '../auth/strategies/user.decorator';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
  constructor(private readonly saleService: SalesService) {}

  @Post()
  @Roles(Role.TENANT_ADMIN, Role.SALES_AGENT, Role.CASHIER)
  async create(
    @Body() createSaleDto: CreateSaleDto,
    @User() user: AuthenticatedUser
  ) {
    return this.saleService.create(createSaleDto, user);
  }

  @Get()
  @Roles(Role.TENANT_ADMIN, Role.SALES_AGENT, Role.MANAGER, Role.CASHIER)
  async findAll(@User() user: AuthenticatedUser) {
    return this.saleService.findAll(user.tenantId);
  }

  @Get(':id')
  @Roles(Role.TENANT_ADMIN, Role.SALES_AGENT, Role.MANAGER, Role.CASHIER)
  async findOne(
    @Param('id') id: string, 
  ) {
    return this.saleService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.TENANT_ADMIN, Role.SALES_AGENT, Role.CASHIER)
  async update(
    @Param('id') id: string, 
    @Body() updateSaleDto: UpdateSaleDto,
    @User() user: AuthenticatedUser
  ) {
    return this.saleService.update(id, user, updateSaleDto);
  }

  @Delete(':id')
  @Roles(Role.TENANT_ADMIN, Role.SALES_AGENT)
  async remove(
    @Param('id') id: string,
  ) {
    return this.saleService.remove(id);
  }
}