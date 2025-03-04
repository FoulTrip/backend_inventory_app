import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  parentId?: string; // Para subcategorías

  @IsString()
  tenantId: string; // ID del tenant al que pertenece la categoría
}