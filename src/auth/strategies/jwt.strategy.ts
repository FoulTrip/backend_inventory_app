import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserOnTenantService } from '../../user-on-tenant/user-on-tenant.service';
import { Role } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userOnTenantService: UserOnTenantService,
    ) {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET no está configurado');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        // Permitir SUPER_ADMIN sin tenant
        if (payload.role === Role.SUPER_ADMIN) {
            return {
                userId: payload.userId,
                role: Role.SUPER_ADMIN,
                email: payload.email,
            };
        }

        // Validar relación tenant para otros roles
        const userTenant = await this.userOnTenantService.getUserTenantRelation(
            payload.userId,
            payload.tenantId,
        );

        if (!userTenant) {
            throw new UnauthorizedException('Acceso no autorizado al tenant');
        }

        return {
            userId: payload.userId,
            tenantId: payload.tenantId,
            role: userTenant.role,
            email: payload.email,
        };
    }
}