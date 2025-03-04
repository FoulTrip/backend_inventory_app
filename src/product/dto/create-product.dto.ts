import { IsString, IsNumber, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsNumber()
  cost: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  taxRate?: number;

  @IsOptional()
  @IsString()
  unitOfMeasure?: string;

  @IsOptional()
  @IsNumber()
  minStockLevel?: number;

  @IsOptional()
  @IsNumber()
  maxStockLevel?: number;

  @IsOptional()
  @IsNumber()
  reorderPoint?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  dimensions?: Record<string, number>;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isPerishable?: boolean;

  @IsOptional()
  @IsBoolean()
  hasSerialNumber?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  categoryId?: string;

  @IsString()
  tenantId: string;
}