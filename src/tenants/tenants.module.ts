import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserOnTenantModule } from 'src/user-on-tenant/user-on-tenant.module';

@Module({
  imports: [PrismaModule, AuthModule, UserOnTenantModule],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule { }
