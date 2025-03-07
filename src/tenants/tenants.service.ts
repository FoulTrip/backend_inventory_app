import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserOnTenantService } from 'src/user-on-tenant/user-on-tenant.service';
import { Role } from '@prisma/client';

@Injectable()
export class TenantsService {
  constructor(
    private readonly prisma: PrismaService,
    private userOnTenantService: UserOnTenantService
  ) { }

  async create(data: CreateTenantDto, userId: string) {
    try {
      const tenant = await this.prisma.tenant.create({ data });
      
      // Asignar automáticamente al creador como ADMIN
      await this.userOnTenantService.assignUserToTenant({
        userId,
        tenantId: tenant.id,
        role: Role.TENANT_ADMIN,
      })

      return { success: true, data: tenant };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async all() {
    try {
      const tenants = await this.prisma.tenant.findMany();
      return { success: true, data: tenants };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async ById(tenantId: string) {
    try {
      const tenant = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
      });

      if (!tenant) {
        throw new Error(`Tenant con ID ${tenantId} no encontrado`);
      }
      return { success: true, data: tenant };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    try {
      const tenant = await this.prisma.tenant.update({
        where: { id },
        data: updateTenantDto,
      });
      return { success: true, data: tenant };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async remove(id: string) {
    try {
      const tenant = await this.prisma.tenant.delete({
        where: { id },
      });
      return { success: true, data: tenant };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }
}