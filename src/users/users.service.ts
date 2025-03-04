import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({ data });
      return { success: true, data: user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async all() {
    try {
      const users = await this.prisma.user.findMany();
      return { success: true, data: users };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async byId(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      return { success: true, data: user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return { success: true, data: user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return { success: true, data: user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }
}