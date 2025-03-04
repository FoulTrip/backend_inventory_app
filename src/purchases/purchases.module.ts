import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [PrismaService],
})
export class PurchasesModule {}
