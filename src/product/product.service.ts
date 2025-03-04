import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  // Crear un nuevo producto
  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // Obtener todos los productos
  async findAll(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
    });
  }

  // Obtener un producto por ID
  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Actualizar un producto
  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // Eliminar un producto
  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}