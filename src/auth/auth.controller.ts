import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './strategies/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: { tenantId: string }, @User() user: any) {
    return this.authService.login(user, body.tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: any) {
    return user;
  }
}
