import { Injectable } from '@nestjs/common';
import { AssignUserToTenantDto } from './dto/create-user-on-tenant.dto';
import { Role } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserOnTenantService {
  constructor(private readonly prisma: PrismaService) { }

  // Asignar un usuario a un tenant con un rol específico
  async assignUserToTenant(data: AssignUserToTenantDto) {
    return this.prisma.userOnTenant.create({
      data: {
        userId: data.userId,
        tenantId: data.tenantId,
        role: data.role,
      },
    });
  }

  // Actualizar el rol de un usuario en un tenant
  async updateUserTenantRole(userId: string, tenantId: string, role: Role) {
    const parsedRole = role as Role; // Convierte el string a Role

    return this.prisma.userOnTenant.update({
      where: { userId_tenantId: { userId, tenantId } },
      data: { role: parsedRole }, // Usa el valor convertido
    });
  }
  // Obtener todos los tenants de un usuario
  async getTenantsByUser(userId: string) {
    return this.prisma.userOnTenant.findMany({
      where: { userId },
      include: { tenant: true },
    });
  }

  // Obtener todos los usuarios de un tenant
  async getUsersByTenant(tenantId: string) {
    return this.prisma.userOnTenant.findMany({
      where: { tenantId },
      include: { user: true },
    });
  }

  // Obtener la relación entre un usuario y un tenant específico
  async getUserTenantRelation(userId: string, tenantId: string) {
    return this.prisma.userOnTenant.findUnique({
      where: {
        userId_tenantId: {
          userId,
          tenantId,
        },
      },
    });
  }
}
