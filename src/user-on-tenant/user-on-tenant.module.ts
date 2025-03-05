import { Module } from '@nestjs/common';
import { UserOnTenantService } from './user-on-tenant.service';
import { UserOnTenantController } from './user-on-tenant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [UserOnTenantController],
  providers: [UserOnTenantService],
  exports: [UserOnTenantService]
})
export class UserOnTenantModule {}
