import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class TenantGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const tenantId = request.headers['x-tenant-id'];

        if (!tenantId) {
            throw new UnauthorizedException('Tenant ID requerido');
        }

        if (!user.tenants.some(t => t.tenantId === tenantId)) {
            throw new UnauthorizedException('Acceso denegado al tenant');
        }

        request.user.tenantId = tenantId;
        return true;
    }
}