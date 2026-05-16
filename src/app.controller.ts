import { Controller, Get, Req } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  home() {
    return "Public route ✅";
  }

  @UseGuards(AuthGuard)
  @Get('dashboard')
  dashboard(@Req() req) {
    return {
      message: "Welcome to dashboard",
      user: (req as any).session.user,
    };
  }

}