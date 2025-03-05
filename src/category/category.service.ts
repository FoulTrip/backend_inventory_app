import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { AuthenticatedUser } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    user: AuthenticatedUser,
  ): Promise<Category> {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        tenantId: user.tenantId,
      },
    });
  }

  async findAll(tenantId: string): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }
}