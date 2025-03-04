import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryItemDto } from './dto/create-inventory.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory.dto';
import { InventoryItem } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInventoryItemDto: CreateInventoryItemDto): Promise<InventoryItem> {
    return this.prisma.inventoryItem.create({
      data: createInventoryItemDto,
    });
  }

  async findAll(tenantId: string): Promise<InventoryItem[]> {
    return this.prisma.inventoryItem.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string): Promise<InventoryItem | null> {
    return this.prisma.inventoryItem.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateInventoryItemDto: UpdateInventoryItemDto): Promise<InventoryItem> {
    return this.prisma.inventoryItem.update({
      where: { id },
      data: updateInventoryItemDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.inventoryItem.delete({
      where: { id },
    });
  }
}