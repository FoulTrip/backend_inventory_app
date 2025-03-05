// login-user.dto.ts
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  tenantId?: string; // Hacemos el tenantId opcional, será requerido para todos excepto SUPER_ADMIN
}

// auth-response.dto.ts permanece igual
export class AuthResponseDto {
  access_token: string;
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  userId: string;
  tenantId?: string; // Puede ser opcional para SUPER_ADMIN
  role: Role;
  email: string;
}