import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [PrismaModule, AuthModule],
})
export class PurchasesModule { }
