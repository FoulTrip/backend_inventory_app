import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    return this.prisma.location.create({
      data: createLocationDto,
    });
  }

  async findAll(tenantId: string): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string): Promise<Location | null> {
    return this.prisma.location.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.location.delete({
      where: { id },
    });
  }
}