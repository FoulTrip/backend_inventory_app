import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserOnTenantService } from 'src/user-on-tenant/user-on-tenant.service';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedUser } from './dto/create-auth.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userOnTenantService: UserOnTenantService,
    private readonly prisma: PrismaService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthenticatedUser, tenantId?: string) { // tenantId ahora es opcional
    // Si es SUPER_ADMIN, omitir validación de tenant
    if (user.role === Role.SUPER_ADMIN) {
      const payload = {
        email: user.email,
        userId: user.userId,
        role: Role.SUPER_ADMIN,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: { ...payload, tenantId: null },
      };
    }

    // Para otros roles, validar el tenant
    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID requerido');
    }

    const tenantRelation = await this.userOnTenantService.getUserTenantRelation(
      user.userId,
      tenantId,
    );

    if (!tenantRelation) {
      throw new UnauthorizedException('Acceso denegado al tenant');
    }

    const payload = {
      email: user.email,
      userId: user.userId,
      tenantId: tenantId,
      role: tenantRelation.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  // Método para obtener todos los tenants (para SUPER_ADMIN)
  async getAllTenants() {
    try {
      const tenants = await this.prisma.tenant.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });
      return { success: true, data: tenants };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Error desconocido' };
    }
  }
}
