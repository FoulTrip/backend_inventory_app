import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  // Crear un nuevo tenant
  @Post()
  async create(@Body() createTenantDto: CreateTenantDto) {
    return await this.tenantsService.create(createTenantDto);
  }

  // Obtener todos los tenants
  @Get()
  async findAll() {
    const result = await this.tenantsService.all();
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  // Obtener un tenant por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.tenantsService.ById(id);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  // Actualizar un tenant
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    const result = await this.tenantsService.update(id, updateTenantDto);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  // Eliminar un tenant
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.tenantsService.remove(id);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}