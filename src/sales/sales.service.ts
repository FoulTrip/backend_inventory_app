import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSaleDto: CreateSaleDto, user: AuthenticatedUser): Promise<Sale> {
    return this.prisma.sale.create({
      data: {
        ...createSaleDto,
        tenantId: user.tenantId,
        createdById: user.userId
      },
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

  async update(id: string, user: AuthenticatedUser, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    return this.prisma.sale.update({
      where: { id },
      data: {
        ...updateSaleDto,
        tenantId: user.tenantId,
        updatedById: user.userId
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.sale.delete({
      where: { id },
    });
  }
}