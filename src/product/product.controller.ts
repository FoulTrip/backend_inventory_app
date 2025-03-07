// src/product/product.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { TenantGuard } from 'src/auth/guards/tenant.guard';
import { User } from 'src/auth/strategies/user.decorator';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @Post()
  @Roles(Role.INVENTORY_MANAGER, Role.TENANT_ADMIN)
  async create(
    @Body() createProductDto: CreateProductDto,
    @User() user: AuthenticatedUser
  ) {
    return this.productService.create({ ...createProductDto, tenantId: user.tenantId! });
  }

  @Get()
  async findAll(@User() user: AuthenticatedUser) {
    return this.productService.findAll(user.tenantId!);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @User() user: AuthenticatedUser
  ) {
    return this.productService.findOne(id, user.tenantId!);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: AuthenticatedUser
  ) {
    return this.productService.update(id, { ...updateProductDto, tenantId: user.tenantId });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User() user: AuthenticatedUser
  ) {
    return this.productService.remove(id, user.tenantId!);
  }
}