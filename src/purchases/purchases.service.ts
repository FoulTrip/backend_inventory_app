import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.prisma.purchase.create({
      data: createPurchaseDto,
    });
  }

  async findAll(tenantId: string): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string): Promise<Purchase | null> {
    return this.prisma.purchase.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    return this.prisma.purchase.update({
      where: { id },
      data: updatePurchaseDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.purchase.delete({
      where: { id },
    });
  }
}