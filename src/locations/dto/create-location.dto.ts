import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { LocationType } from '@prisma/client';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsEnum(LocationType)
  type: LocationType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsString()
  tenantId: string;
}