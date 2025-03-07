import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { User } from 'src/auth/strategies/user.decorator';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Controller('tenants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) { }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  async create(@Body() createTenantDto: CreateTenantDto, @User() user: AuthenticatedUser) {
    return await this.tenantsService.create(createTenantDto, user.userId);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.TENANT_ADMIN)
  async findAll() {
    const result = await this.tenantsService.all();
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.TENANT_ADMIN)
  async findOne(
    @Param('id') id: string,
  ) {
    // Implement tenant access control if needed
    const result = await this.tenantsService.ById(id);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN, Role.TENANT_ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    const result = await this.tenantsService.update(id, updateTenantDto);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  async remove(@Param('id') id: string) {
    const result = await this.tenantsService.remove(id);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}