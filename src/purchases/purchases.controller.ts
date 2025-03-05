import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../users/dto/create-user.dto';
import { User } from '../auth/strategies/user.decorator';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Controller('purchases')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PurchasesController {
  constructor(private readonly purchaseService: PurchasesService) {}

  @Post()
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async create(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @User() user: AuthenticatedUser
  ) {
    return this.purchaseService.create(createPurchaseDto, user);
  }

  @Get()
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER, Role.MANAGER)
  async findAll(@User() user: AuthenticatedUser) {
    return this.purchaseService.findAll(user.tenantId);
  }

  @Get(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER, Role.MANAGER)
  async findOne(
    @Param('id') id: string,
  ) {
    return this.purchaseService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async update(
    @Param('id') id: string, 
    @Body() updatePurchaseDto: UpdatePurchaseDto,
    @User() user: AuthenticatedUser
  ) {
    return this.purchaseService.update(id, user, updatePurchaseDto);
  }

  @Delete(':id')
  @Roles(Role.TENANT_ADMIN, Role.INVENTORY_MANAGER)
  async remove(
    @Param('id') id: string,
  ) {
    return this.purchaseService.remove(id);
  }
}