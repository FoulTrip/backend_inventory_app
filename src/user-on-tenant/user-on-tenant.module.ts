import { Module } from '@nestjs/common';
import { UserOnTenantService } from './user-on-tenant.service';
import { UserOnTenantController } from './user-on-tenant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserOnTenantController],
  providers: [UserOnTenantService],
})
export class UserOnTenantModule {}
