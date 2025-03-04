import { PartialType } from '@nestjs/mapped-types';
import { CreateUserOnTenantDto } from './create-user-on-tenant.dto';

export class UpdateUserOnTenantDto extends PartialType(CreateUserOnTenantDto) {}
