import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryItemDto {
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @IsString()
  batchNumber?: string;

  @IsOptional()
  expiryDate?: Date;

  @IsOptional()
  purchaseDate?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  productId: string;

  @IsString()
  locationId: string;

  @IsString()
  tenantId: string;
}