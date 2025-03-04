import { PaymentMethod, PaymentStatus, SaleStatus } from '@prisma/client';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  saleNumber: string;

  @IsOptional()
  invoiceNumber?: string;

  @IsEnum(SaleStatus)
  status: SaleStatus;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  taxAmount: number;

  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @IsNumber()
  totalAmount: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  customerId?: string;

  @IsString()
  tenantId: string;

  @IsString()
  createdById: string;

  @IsOptional()
  @IsString()
  updatedById?: string;
}