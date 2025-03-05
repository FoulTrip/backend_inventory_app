export class CreateUserOnTenantDto { }

import { IsString, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class AssignUserToTenantDto {
  @IsString()
  userId: string;

  @IsString()
  tenantId: string;

  @IsEnum(Role)
  role: Role;
}