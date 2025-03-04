import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserOnTenantModule } from './user-on-tenant/user-on-tenant.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { LocationsModule } from './locations/locations.module';
import { PurchasesModule } from './purchases/purchases.module';
import { SalesModule } from './sales/sales.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    TenantsModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserOnTenantModule,
    CategoryModule,
    ProductModule,
    InventoryModule,
    LocationsModule,
    PurchasesModule,
    SalesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
