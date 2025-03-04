import { PartialType } from '@nestjs/mapped-types';
import { CreateTenantDto } from './create-tenant.dto';
import { IsUUID } from 'class-validator';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @IsUUID()
  id: string;
}