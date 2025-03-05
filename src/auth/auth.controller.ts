import { Controller, Get, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './strategies/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedUser, LoginUserDto } from './dto/create-auth.dto';
import { UserOnTenantService } from 'src/user-on-tenant/user-on-tenant.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userOnTenantService: UserOnTenantService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @User() user: AuthenticatedUser
  ) {
    // Obtener el tenantId del cuerpo de la solicitud
    const { tenantId } = loginUserDto;
    return this.authService.login(user, tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: any) {
    return user;
  }

  // Nuevo endpoint para obtener los tenants disponibles para el usuario
  @UseGuards(JwtAuthGuard)
  @Get('my-tenants')
  async getMyTenants(@User() user: AuthenticatedUser) {
    // Para SUPER_ADMIN, podrían mostrarse todos los tenants del sistema
    if (user.role === 'SUPER_ADMIN') {
      const allTenants = await this.authService.getAllTenants();
      return allTenants;
    }

    // Para usuarios normales, mostrar solo los tenants a los que tienen acceso
    return this.userOnTenantService.getUserTenants(user.userId);
  }

  @Post('switch-tenant')
  @UseGuards(JwtAuthGuard)
  async switchTenant(
    @Body('tenantId') tenantId: string,
    @User() currentUser: AuthenticatedUser
  ) {
    const tenantRelation = await this.userOnTenantService.getUserTenantRelation(
      currentUser.userId,
      tenantId
    );

    if (!tenantRelation) {
      throw new UnauthorizedException('No tienes acceso a este tenant');
    }

    // Usa el authService para generar el token
    return this.authService.login(currentUser, tenantId);
  }
}