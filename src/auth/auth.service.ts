import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserOnTenantService } from 'src/user-on-tenant/user-on-tenant.service';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedUser } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userOnTenantService: UserOnTenantService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthenticatedUser, tenantId: string) {
    const tenantRelation = await this.userOnTenantService.getUserTenantRelation(
      user.userId,
      tenantId,
    );

    if (!tenantRelation) {
      throw new UnauthorizedException('Usuario no tiene acceso a este tenant');
    }

    const payload = {
      email: user.email,
      userId: user.userId,
      tenantId: tenantId,
      role: tenantRelation.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.userId,
        email: user.email,
        role: tenantRelation.role,
        tenantId: tenantId,
      },
    };
  }
}
