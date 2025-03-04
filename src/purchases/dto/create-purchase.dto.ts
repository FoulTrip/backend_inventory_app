import { PaymentStatus, PurchaseStatus } from '@prisma/client';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  purchaseNumber: string;

  @IsOptional()
  expectedDate?: Date;

  @IsOptional()
  receivedDate?: Date;

  @IsEnum(PurchaseStatus)
  status: PurchaseStatus;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  taxAmount: number;

  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @IsOptional()
  @IsNumber()
  shippingCost?: number;

  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  attachments?: string[];

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsOptional()
  paymentDueDate?: Date;

  @IsString()
  supplierId: string;

  @IsString()
  tenantId: string;

  @IsString()
  createdById: string;

  @IsOptional()
  @IsString()
  updatedById?: string;
}