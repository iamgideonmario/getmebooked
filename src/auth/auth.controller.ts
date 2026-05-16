import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('register')
  registerForm() {
    return "Register page (UI later)";
  }

  @Post('register')
  async register(@Body() body, @Req() req) {
    const user = await this.authService.register(body.email, body.password);

    req.session.user = user;

    return { message: "User registered", user };
  }

  @Get('login')
  loginForm() {
    return "Login page (UI later)";
  }

  @Post('login')
  async login(@Body() body, @Req() req) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      return { error: "Invalid credentials" };
    }

    req.session.user = user;

    return { message: "Logged in", user };
  }

  @Get('logout')
  logout(@Req() req) {
    req.session.destroy(() => {});
    return { message: "Logged out" };
  }
}
``