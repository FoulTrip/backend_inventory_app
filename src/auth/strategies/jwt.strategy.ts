import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserOnTenantService } from '../../user-on-tenant/user-on-tenant.service';
import { Role } from '@prisma/client';

interface JwtPayload {
    userId: string;
    role: Role;
    email: string;
    tenants: Tenant[];
    tenantId?: string;
}

interface Tenant {
    tenantId: string;
    role: Role;
}

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

    async validate(payload: JwtPayload) {
        // Para SUPER_ADMIN permitir acceso sin tenant
        if (payload.role === Role.SUPER_ADMIN) {
            return {
                userId: payload.userId,
                role: Role.SUPER_ADMIN,
                email: payload.email,
                tenants: payload.tenants // Lista de tenants
            };
        }

        // Validar que el tenant solicitado esté en la lista del usuario
        const tenantIds = payload.tenants.map(t => t.tenantId);
        if (!tenantIds.includes(payload.tenantId!)) {
            throw new UnauthorizedException('Acceso no autorizado al tenant');
        }

        return {
            userId: payload.userId,
            tenantId: payload.tenantId,
            role: payload.tenants.find(t => t.tenantId === payload.tenantId)?.role,
            email: payload.email
        };
    }
}