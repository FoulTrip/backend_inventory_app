import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.prisma.sale.create({
      data: createSaleDto,
    });
  }

  async findAll(tenantId: string): Promise<Sale[]> {
    return this.prisma.sale.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string): Promise<Sale | null> {
    return this.prisma.sale.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    return this.prisma.sale.update({
      where: { id },
      data: updateSaleDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.sale.delete({
      where: { id },
    });
  }
}