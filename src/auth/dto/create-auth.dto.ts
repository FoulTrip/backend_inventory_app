// login-user.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  user: {
    id: string;
    email: string;
    role: string;
    tenantId: string;
  };
}