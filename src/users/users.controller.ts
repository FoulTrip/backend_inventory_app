import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Crear un nuevo usuario
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  // Obtener todos los usuarios
  @Get()
  async findAll() {
    const result = await this.usersService.all();
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  // Obtener un usuario por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.usersService.byId(id);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  // Actualizar un usuario
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(id, updateUserDto);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  // Eliminar un usuario
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    if (result?.success === false) {
      throw new HttpException(result.error!, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}