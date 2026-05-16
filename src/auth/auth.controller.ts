import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }, @Req() req: Request) {
    const user = await this.authService.register(body.email, body.password);

    (req as any).session.user = user;

    return { message: 'User registered', user };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Req() req: Request) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    (req as any).session.user = user;

    return { message: 'Logged in', user };
  }

  @Get('logout')
  logout(@Req() req: Request) {
    (req as any).session.destroy(() => {});
    return { message: 'Logged out' };
  }
}