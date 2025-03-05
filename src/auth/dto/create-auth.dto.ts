// login-user.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/users/dto/create-user.dto';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  tenantId: string;
}

// auth-response.dto.ts
export class AuthResponseDto {
  access_token: string;
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  userId: string;
  tenantId: string;
  role: Role;
  email: string;
}