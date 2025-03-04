export class CreateUserOnTenantDto { }

import { IsString, IsEnum } from 'class-validator';
import { Role } from 'src/users/dto/create-user.dto';

export class AssignUserToTenantDto {
  @IsString()
  userId: string;

  @IsString()
  tenantId: string;

  @IsEnum(Role)
  role: Role;
}