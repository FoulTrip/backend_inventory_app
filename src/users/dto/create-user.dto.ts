import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsUUID,
} from 'class-validator';

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  MANAGER = 'MANAGER',
  INVENTORY_MANAGER = 'INVENTORY_MANAGER',
  SALES_AGENT = 'SALES_AGENT',
  CASHIER = 'CASHIER',
  USER = 'USER',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(Role)
  role: Role;

  @IsUUID()
  tenantId: string;
}