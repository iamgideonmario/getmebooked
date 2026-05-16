import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';
import { Request } from 'express';

@Controller()
export class AppController {

  @Get()
  home() {
    return "Public route ✅";
  }

  @UseGuards(AuthGuard)
  @Get('dashboard')
  dashboard(@Req() req: Request) {
    return {
      message: "Dashboard",
      user: (req as any).session.user,
    };
  }
}
``