import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPurchaseDto: CreatePurchaseDto, user: AuthenticatedUser): Promise<Purchase> {
    return this.prisma.purchase.create({
      data: {
        ...createPurchaseDto,
        tenantId: user.tenantId!,
        createdById: user.userId
      },
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

  async update(
    id: string,
    user: AuthenticatedUser,
    updatePurchaseDto: UpdatePurchaseDto
  ): Promise<Purchase> {
    return this.prisma.purchase.update({
      where: { id },
      data: {
        ...updatePurchaseDto,
        tenantId: user.tenantId,
        updatedById: user.userId
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.purchase.delete({
      where: { id },
    });
  }
}