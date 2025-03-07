import { Controller, Post, Body, Get, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { User } from 'src/auth/strategies/user.decorator';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @Roles(
    Role.TENANT_ADMIN,
    Role.INVENTORY_MANAGER,
  )
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.categoryService.create(createCategoryDto, user);
  }

  @Get()
  @Roles(
    Role.TENANT_ADMIN,
    Role.INVENTORY_MANAGER,
    Role.MANAGER,
    Role.SALES_AGENT,
  )
  async findAll(@User() user: AuthenticatedUser) {
    return this.categoryService.findAll(user.tenantId!);
  }

  @Get(':id')
  @Roles(
    Role.TENANT_ADMIN,
    Role.INVENTORY_MANAGER,
    Role.MANAGER,
    Role.SALES_AGENT,
  )
  async findOne(@Param() id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @Roles(
    Role.TENANT_ADMIN,
    Role.INVENTORY_MANAGER,
  )
  async update(@Param() id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(
    Role.TENANT_ADMIN,
    Role.INVENTORY_MANAGER,
  )
  async remove(@Param() id: string) {
    return this.categoryService.remove(id);
  }
}
