import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PurchasesController],
  providers: [
    PurchasesService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
    RolesGuard,
  ],
  imports: [PrismaModule],
})
export class PurchasesModule { }
