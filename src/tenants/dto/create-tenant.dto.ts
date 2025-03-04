import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export enum CurrencyType {
  COP = 'COP',
  USD = 'USD',
}

export enum TimeZones {
  UTC = 'UTC',
}

export class CreateTenantDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  taxId?: string;

  @IsEnum(CurrencyType)
  currency: CurrencyType;

  @IsEnum(TimeZones)
  timezone: TimeZones;

  @IsOptional()
  @IsString()
  websiteUrl?: string;

  @IsBoolean()
  active: boolean;
}