import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  controllers: [LocationsController],
  providers: [
    LocationsService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
    RolesGuard,
  ],
  imports: [PrismaModule],
})

export class LocationsModule { }
