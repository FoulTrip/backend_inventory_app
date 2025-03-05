import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UserOnTenantService } from './user-on-tenant.service';
import { AssignUserToTenantDto } from './dto/create-user-on-tenant.dto';
import { Role } from '@prisma/client';

@Controller('user-on-tenant')
export class UserOnTenantController {
  constructor(private readonly userOnTenantService: UserOnTenantService) { }

  @Post()
  assignUserToTenant(@Body() data: AssignUserToTenantDto) {
    return this.userOnTenantService.assignUserToTenant(data);
  }

  @Put(':userId/:tenantId')
  updateUserTenantRole(
    @Param('userId') userId: string,
    @Param('tenantId') tenantId: string,
    @Body('role') role: Role,
  ) {
    return this.userOnTenantService.updateUserTenantRole(userId, tenantId, role);
  }

  @Get('users/:tenantId')
  getUsersByTenant(@Param('tenantId') tenantId: string) {
    return this.userOnTenantService.getUsersByTenant(tenantId);
  }

  @Get('tenants/:userId')
  getTenantsByUser(@Param('userId') userId: string) {
    return this.userOnTenantService.getTenantsByUser(userId);
  }
}
