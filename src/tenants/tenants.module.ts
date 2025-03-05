import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [
    TenantsController,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
    RolesGuard,
  ],
  providers: [TenantsService],
})
export class TenantsModule { }
